import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../authentication/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 
  // const userService = inject(UserService);
  if(localStorage.getItem('currentUser')){
    return true;
  }
  router.navigate(['/login']);
  return false;


};
