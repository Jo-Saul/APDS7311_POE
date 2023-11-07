//auth guard service - used to protect routes against unauthorised access

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //constructor
  constructor(private authService: AuthServiceService, private router: Router) { }

  //method to test if user has permission to access route
  canActivate(): boolean {
    if (this.authService.isLoggedIn())//user is logged in
    {
      return true;
    } 
    else //user is not logged in
    {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
