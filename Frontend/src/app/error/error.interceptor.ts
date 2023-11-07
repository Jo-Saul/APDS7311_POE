import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        let errorMessage = "An Unknow Error has occured";
        if (error.error && error.error.error) // Check if the error message exists in the error object
        {
          errorMessage = error.error.error; // Use the error message from the backend
        }
      this.dialog.open(ErrorComponent,{data:{message:errorMessage}});
      return throwError(error);
      })
      );
  }
}






