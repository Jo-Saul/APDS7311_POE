//sign up component - used to sign up new user

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  hidePassword = true;

  signupForm!: FormGroup;

  //constructor
  constructor (public authservice: AuthServiceService, private router: Router, private fb: FormBuilder) {}

  //initialization
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      enteredUsername: ['', [Validators.required, Validators.minLength(1)]],
      enteredPassword: ['', [Validators.required, Validators.minLength(1)]],
      enteredFirstname: ['', [Validators.required, Validators.minLength(1)]],
      enteredLastname: ['', [Validators.required, Validators.minLength(1)]],
      enteredContact: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  //getters for input fileds
  //------------------------------------------------------------------------------
  get enteredUsername() {
    return this.signupForm.get('enteredUsername');
  }
  get enteredPassword() {
    return this.signupForm.get('enteredPassword');
  }
  get enteredFirstname() {
    return this.signupForm.get('enteredFirstname');
  }
  get enteredLastname() {
    return this.signupForm.get('enteredLastname');
  }
  get enteredContact() {
    return this.signupForm.get('enteredContact');
  }
  //------------------------------------------------------------------------------


  //validation for input fields  
  //------------------------------------------------------------------------------
  get usernameValidationMessage() {
    if (this.enteredUsername?.touched && this.enteredUsername?.errors?.['required']) {
      return 'Username is required';
    } else if (this.enteredUsername?.touched && this.enteredUsername?.errors?.['pattern']) {
      return 'Username must start with an uppercase letter and can contain both letters and numbers. Length must be between 2 and 50.';
    }
    return '';
  }
  
  get passwordValidationMessage() {
    if (this.enteredPassword?.touched && this.enteredPassword?.errors?.['required']) {
      return 'Password is required';
    } else if (this.enteredPassword?.touched && this.enteredPassword?.errors?.['pattern']) {
      return 'Password must have a number, a lowercase letter, an uppercase letter, a special character, and its length must be between 3 and 50.';
    }
    return '';
  }
  
  get firstnameValidationMessage() {
    if (this.enteredFirstname?.touched && this.enteredFirstname?.errors?.['required']) {
      return 'Firstname is required';
    } else if (this.enteredFirstname?.touched && this.enteredFirstname?.errors?.['pattern']) {
      return 'Firstname must start with an uppercase letter and can only contain letters. Length must be between 2 and 50.';
    }
    return '';
  }
  
  get lastnameValidationMessage() {
    if (this.enteredLastname?.touched && this.enteredLastname?.errors?.['required']) {
      return 'Lastname is required';
    } else if (this.enteredLastname?.touched && this.enteredLastname?.errors?.['pattern']) {
      return 'Lastname must start with an uppercase letter and can only contain letters. Length must be between 2 and 50.';
    }
    return '';
  }
  
  get contactValidationMessage() {
    if (this.enteredContact?.touched && this.enteredContact?.errors?.['required']) {
      return 'Contact is required';
    }
    return '';
  }
  //------------------------------------------------------------------------------

  //sign up method - calls auth service
  onsignup() {
    if (this.signupForm.invalid) {
      if (!this.signupForm.value.enteredUsername || !this.signupForm.value.enteredPassword || !this.signupForm.value.enteredFirstname || !this.signupForm.value.enteredLastname || !this.signupForm.value.enteredContact) {
        alert('Please fill in all the required fields');
      } else {
        alert('Invalid');
      }
      return;
    } else {
      this.authservice.signup(
        this.signupForm.value.enteredUsername,
        this.signupForm.value.enteredPassword,
        this.signupForm.value.enteredFirstname,
        this.signupForm.value.enteredLastname,
        this.signupForm.value.enteredContact
      );
    }
  }
}
