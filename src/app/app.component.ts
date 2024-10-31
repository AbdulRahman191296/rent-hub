import { Component } from '@angular/core';
import { UserService } from './authentication/user.service';
import { User } from './authentication/user';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  optionsExpand = false;
  title = 'rent-hub';
  homeRoute = true;
  currentUser: User | undefined;
  constructor(private userService: UserService, private router: Router) {
    // this.currentUser = this.userService.currentUser;
  }
  ngOnInit() {
    
    this.userService.currentUser$.subscribe(x=> {
      this.currentUser = x;
    })

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if(event.url === "/create-post") {
          this.homeRoute = false;
        }
        if(event.url === "/home") {
          this.homeRoute = true;
        }
        // this.currentUrl = event.url; // Get the current URL
        console.log(event.url); // Log or use the current URL as needed
      });

    //handling refresh
    if(localStorage.getItem('currentUser')?.length > 0) {
      this.userService.currentUserSubject.next(JSON.parse(localStorage.getItem('currentUser')))
    }
  }

  onSignOut() {
  
    if(!this.homeRoute) {
      this.router.navigate(['/home']);
    }
    this.userService.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }
}
