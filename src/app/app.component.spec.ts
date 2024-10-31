import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


import { Firestore } from 'firebase/firestore';
import { UserService } from './authentication/user.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // For Firestore
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp({
          apiKey: "AIzaSyCHbHUAOUTJg7-_Ufj0J05lsyLSyStnwRE",
          authDomain: "rent-hub-4404.firebaseapp.com",
          projectId: "rent-hub-4404",
          storageBucket: "rent-hub-4404.appspot.com",
          messagingSenderId: "757485454934",
          appId: "1:757485454934:web:ccc6e9b9f388093e045df7",
        }), // Initialize Firebase
        AngularFirestoreModule,
        
      ],
      providers: [
        UserService,
        Router,
        provideFirebaseApp(() => initializeApp(
          {
            apiKey: "AIzaSyCHbHUAOUTJg7-_Ufj0J05lsyLSyStnwRE",
            authDomain: "rent-hub-4404.firebaseapp.com",
            projectId: "rent-hub-4404",
            storageBucket: "rent-hub-4404.appspot.com",
            messagingSenderId: "757485454934",
            appId: "1:757485454934:web:ccc6e9b9f388093e045df7",
          }
        )),
        provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rent-hub'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('rent-hub');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, rent-hub');
  });
});
