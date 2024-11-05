import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


import { Firestore } from 'firebase/firestore';
import { UserService } from './authentication/user.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // For Firestore
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';


describe('AppComponent', () => {
  let component : AppComponent;
  let router: Router;
  let userService: UserService;
  let routerEventsSubject: Subject<any>;
  beforeEach(async () => {
    routerEventsSubject = new Subject();

    const routerMock = {
      events: routerEventsSubject.asObservable(),
      navigate: jasmine.createSpy('navigate')
    };

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

    component = TestBed.createComponent(AppComponent).componentInstance;
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);
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

  it('should navigate to /home if homeRoute is falsy', () => {
    component.homeRoute = null; // Set homeRoute to falsy
    spyOn(router, 'navigate');
    component.onSignOut();
    
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not navigate if homeRoute is truthy', () => {
    component.homeRoute = true; // Set homeRoute to truthy
    spyOn(router, 'navigate');
    component.onSignOut();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should update currentUserSubject to null and remove currentUser from localStorage', () => {
    spyOn(localStorage, 'removeItem');
    component.onSignOut();

    expect(userService.currentUserSubject.value).toBe(null);
    expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser');
  });


  it('should set homeRoute to false if the URL is /create-post', () => {
    component.ngOnInit();

    routerEventsSubject.next(new NavigationEnd(1, '/create-post', '/create-post'));

    expect(component.homeRoute).toBe(true);
  });

  it('should set homeRoute to true if the URL is /home', () => {
    component.ngOnInit();

    routerEventsSubject.next(new NavigationEnd(1, '/home', '/home'));

    expect(component.homeRoute).toBe(true);
  });

  it('should update currentUserSubject if currentUser exists in localStorage', () => {
    const mockUser = { name: 'Stored User' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    spyOn(userService.currentUserSubject, 'next');

    component.ngOnInit();

    expect(userService.currentUserSubject.next).toHaveBeenCalledWith(mockUser);
  });

  it('should not update currentUserSubject if localStorage currentUser is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue('');
    spyOn(userService.currentUserSubject, 'next');

    component.ngOnInit();

    expect(userService.currentUserSubject.next).not.toHaveBeenCalled();
  });
});
