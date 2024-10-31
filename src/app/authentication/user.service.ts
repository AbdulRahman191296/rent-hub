import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { collectionData, Firestore, FieldValue, arrayUnion } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  posts: any = [];
  currentUser?: User;
  currentUserSubject = new BehaviorSubject<User | undefined>(undefined);
  currentUser$ = this.currentUserSubject.asObservable();

  postsSubject = new BehaviorSubject<any[] | undefined>([]);
  postsObs$ = this.postsSubject.asObservable();

  constructor(private fireStore: Firestore, private af : AngularFirestore) { }

  getAllUsers(): Observable<any> {
    return this.af.collection('rentHubNagarro').doc("users").snapshotChanges();
  }

  getAllPosts(): Observable<any> {
    return this.af.collection('rentHubNagarro').doc("posts").snapshotChanges();
  }


  registerUser(user: any) {
    const userCollection = collection(this.fireStore, 'users');
    return addDoc(userCollection, user);
  }

   registerUserInDocument(user: any) {
    const userRef = this.af.collection('rentHubNagarro').doc("users");
    
    return userRef.update({
      allUsers: arrayUnion(user) // Add user to the array
    }).catch(() => {
      // If the document doesn't exist, create it
      return userRef.set({
        allUsers: [user] // Initialize with the first user
      });
    });
  }

  updatePostsInFirebase(id, commets: any, interest?: boolean) {
    const postRef = this.af.collection('rentHubNagarro').doc('posts');

    // postRef.get()

    postRef.valueChanges().pipe(
      take(1),
      map((doc: any) => {
          if (doc && doc.allPosts) {
              // Update the specific object in the array
              return doc.allPosts.map(post => {
                  if (post.id === id) {
                      if(interest) {
                        return {...post, interests: commets};
                      }
                      else{
                        return { ...post, comments: commets };
                      }
                       // Update the field you want
                  }
                  return post;
              });
          }
          return [];
      })
  ).subscribe(updatedPosts => {
      // Update the document with the modified array
      postRef.update({ allPosts: updatedPosts })
          .then(() => {
              console.log("Array updated successfully!");
          })
          .catch((error) => {
              console.error("Error updating array: ", error);
          });
  }, error => {
      console.error("Error getting document:", error);
  });
  }

  registerPostsInDocument(post: any) {
    const postRef = this.af.collection('rentHubNagarro').doc("posts");
    
    return postRef.update({
      allPosts: arrayUnion(post) // Add user to the array
    }).catch(() => {
      // If the document doesn't exist, create it
      return postRef.set({
        allPosts: [post] // Initialize with the first user
      });
    });
  }
  
}
