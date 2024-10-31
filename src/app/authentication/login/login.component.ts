import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usersArrayFromFirebase = [];
  signupForm: FormGroup;
  noUserMsg : string | undefined;
  // formSubmitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    // this.userService.getUsers().subscribe(x=> {
    //   this.usersArrayFromFirebase = x;
    //   console.log("VALUE FORM FIREBASE", x);
    // });

    this.userService.getAllUsers().subscribe(x => {
      console.log("hello world",  x.payload.data());
      this.usersArrayFromFirebase = x.payload.data().allUsers;
      //console.log("get users by doc id", x)
    })
  }

  onSubmit() {
    this.noUserMsg = undefined;
    console.log('form data', this.signupForm);
    if (this.signupForm.valid) {
      // this.formSubmitted = true;
      console.log('Form Submitted!', this.signupForm.value);
      let user = this.usersArrayFromFirebase.filter(x=> x.emailId === this.signupForm.get('email')?.value && x.password === this.signupForm.get('password')?.value);
      let user1 = this.usersArrayFromFirebase.filter(x=> x.emailId === this.signupForm.get('email')?.value && x.password !== this.signupForm.get('password')?.value);
      if(user.length > 0){
        console.log("user exists", user);
        localStorage.setItem('currentUser', JSON.stringify(user[0]));
        this.userService.currentUserSubject.next(user[0]);
        // this.userService.currentUser = user[0];
        this.router.navigate(['/home'])
      }
      
      else if(user1.length > 0) {
        this.noUserMsg = 'Wrong Password'
      }

      else {
        this.noUserMsg = 'User does not exist. Please register.'
      }
      // Here you can add your logic to handle the signup, e.g., send the data to an API
    }
  }
}
