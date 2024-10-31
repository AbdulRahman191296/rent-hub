import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './create-post/create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // For Firestore
import { getAuth, provideAuth } from '@angular/fire/auth';
import { DetailsComponent } from './details/details.component'; // For Authentication
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { PreviewOverlayComponent } from './preview-overlay/preview-overlay.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreatePostComponent,
    HomeComponent,
    DetailsComponent,
    PreviewOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCHbHUAOUTJg7-_Ufj0J05lsyLSyStnwRE",
      authDomain: "rent-hub-4404.firebaseapp.com",
      projectId: "rent-hub-4404",
      storageBucket: "rent-hub-4404.appspot.com",
      messagingSenderId: "757485454934",
      appId: "1:757485454934:web:ccc6e9b9f388093e045df7",
    }), // Initialize Firebase
    AngularFirestoreModule, // Firestore module

    // provideFirebaseApp(() => initializeApp({})), // Initialize Firebase
    // provideFirestore(() => getFirestore()), // For Firestore
    // provideAuth(() => getAuth()), // For Authentication
  ],
  providers: [
    
      provideFirebaseApp(() => initializeApp(
        {
          apiKey: "AIzaSyCHbHUAOUTJg7-_Ufj0J05lsyLSyStnwRE",
          authDomain: "rent-hub-4404.firebaseapp.com",
          projectId: "rent-hub-4404",
          storageBucket: "rent-hub-4404.appspot.com",
          messagingSenderId: "757485454934",
          appId: "1:757485454934:web:ccc6e9b9f388093e045df7",
        }
      )), /* The problem line */
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
