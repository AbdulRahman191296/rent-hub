import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../authentication/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  post: any;
  newComment = "";
  comments = [];
  interestDisable = false;
 

  constructor(private router: Router, private userService: UserService) {
    const navigation = this.router.getCurrentNavigation();
    console.log("nav obj", navigation)
    if (navigation?.extras.state) {
      this.post = navigation.extras.state['selectedPost']; // Access the passed user object
      console.log("POST FROM VIEW DETAILS", this.post)
    }
  }

  sendInterest() {
    this.post.interests.push({
      emailId: JSON.parse(localStorage.getItem('currentUser')).emailId,
      contact: 8838195520
    });
    this.userService.updatePostsInFirebase(this.post.id, this.post.interests, true );
    this.interestDisable = true;
  }

  addComment() {
    if(localStorage.getItem('currentUser')) {
      let commentObj = {
        emailId: JSON.parse(localStorage.getItem('currentUser')).emailId,
        comment: this.newComment,
      }
      this.comments.push(commentObj);
      this.newComment=""
      this.userService.updatePostsInFirebase(this.post.id, this.comments);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {

    if(this.post.comments) {
      this.comments = this.post.comments;
    }
    else {
      this.comments = []
    }

    if(this.post.interests.length > 0){
      this.post.interests.forEach(x=> {
        if(x.emailId === JSON.parse(localStorage.getItem('currentUser')).emailId) {
          this.interestDisable = true;
        }
      })
    }
    
    // console.log("route",this.act );
    // this.act.data.subscribe(x => {
    //   console.log("XXX", x);

    // })
    
    
  }
}
