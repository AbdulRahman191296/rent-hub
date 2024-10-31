import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  signupForm: FormGroup;
  usersArrayFromFirebase = [];
  alreadyExistsUser = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(x=> {
       this.usersArrayFromFirebase = x.payload.data().allUsers;
      console.log("VALUE FORM FIREBASE last seesion", x.payload.data());
    })
  }

  onSubmit() {
    this.alreadyExistsUser = [];
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);
      let userData: User = {
        name: this.signupForm.get('name')?.value,
        emailId: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value,
        favPostIds: [] 
      }
      if(this.usersArrayFromFirebase.length > 0) {
         this.alreadyExistsUser = this.usersArrayFromFirebase.filter(x => x.emailId === userData.emailId)
      }
      if(this.alreadyExistsUser.length == 0) {
        this.userService.registerUserInDocument(userData);
      this.router.navigate(['/login']); 
      }
      
    }
  }

}
