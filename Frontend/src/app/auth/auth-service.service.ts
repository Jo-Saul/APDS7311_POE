//auth service - service for authenticating user. handles signup and login

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //observable to hold the username of the logged in user
  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  //constructor
  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) 
  { 
    this.checkUserStatus();
  }

  //sign up method
  signup (uname:string, upass:string, ufirst:string, ulast:string, ucont:string)
  {
    this.http.post('https://localhost:3000/api/user', {
      username:uname,
      password:upass,
      firstname:ufirst,
      lastname:ulast,
      contact:ucont
    }, {responseType: 'text'})
    .subscribe(response =>{
      //navigate to login after user sucessfully created
      this.router.navigate(['/login']);
    });
  }

  //login method
  login (uname:string, upass:string)
  {
    this.http.post<{token:string}>('https://localhost:3000/api/auth',{
      username:uname,
      password:upass
    })
    .subscribe(respose =>{
      const token = respose.token;
      this.tokenService.setToken(token);
      //save username
      localStorage.setItem('username', uname); // save the username
      //update username observable
      this.usernameSubject.next(uname); // update the username observable
      //navigate to home after successful login
      this.router.navigate(['/home']);
    })
  }

  //method to check if user is logged in
  isLoggedIn() {
    return this.tokenService.getToken() != null;
  }

  //method to logout user
  logout() {
    this.tokenService.removeToken();
    localStorage.removeItem('username');
    //update tusername observable
    this.usernameSubject.next(null);
    //navigate to login after successful logout
    this.router.navigate(['/login']); 
  }

  checkUserStatus() {
    const username = localStorage.getItem('username');
    if (username) {
      this.usernameSubject.next(username);
    }
  }
}