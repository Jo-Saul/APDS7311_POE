//auth interceptor

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  //constructor
  constructor(private tokenservice: TokenService) {}

  //method to set auth token to header
  intercept(request: HttpRequest<unknown>, next: HttpHandler){
    const authToken = this.tokenservice.getToken() || "";
    const authRequest = request.clone({headers:request.headers.set("x-auth-token", authToken)});
    return next.handle(authRequest);
  }
}
