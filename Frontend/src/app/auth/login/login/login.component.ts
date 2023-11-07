//login componet - used to login user

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //constructor
  constructor (public authservice: AuthServiceService, private router: Router, private fb: FormBuilder) {}

  loginForm!: FormGroup;

  //initialization
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      enteredUsername: ['', [Validators.required, Validators.minLength(1)]],
      enteredPassword: ['', [Validators.required, Validators.minLength(1)]]
    });
  }


  //getters for login input
  //---------------------------------------------------------------
  get enteredUsername() {
    return this.loginForm.get('enteredUsername');
  }

  get enteredPassword() {
    return this.loginForm.get('enteredPassword');
  }
  //---------------------------------------------------------------

  //validation for login input
  get usernameValidationMessage() {
    if (this.enteredUsername?.touched && this.enteredUsername?.errors?.['required']) {
      return 'Username is required';
    }
    return '';
  }
  
  get passwordValidationMessage() {
    if (this.enteredPassword?.touched && this.enteredPassword?.errors?.['required']) {
      return 'Password is required';
    }
    return '';
  }
  //---------------------------------------------------------------
  
  
  //login
  onlogin() {
    if (this.loginForm.invalid) {
      if (!this.loginForm.value.enteredUsername || !this.loginForm.value.enteredPassword) {
        alert('Please fill in all the fields');
      } else {
        alert('Invalid');
      }
      return;
    } else {
      this.authservice.login(this.loginForm.value.enteredUsername, this.loginForm.value.enteredPassword);
    }
  }
}
