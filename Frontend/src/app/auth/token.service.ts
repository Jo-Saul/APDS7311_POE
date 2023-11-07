//token service - handles auth token

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  //method to set token to storage
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  //method to get token from storage
  getToken() {
    return localStorage.getItem('token');
  }

  //method to remove token from storage
  removeToken() {
    localStorage.removeItem('token');
  }
}
