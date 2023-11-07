//post create component - handles post creation

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostServiceService } from '../post-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{

  postForm!: FormGroup;

  //constructor
  constructor(public postservice: PostServiceService, private router: Router, private fb: FormBuilder) {}

  //initialization
  ngOnInit(): void {
    this.postForm = this.fb.group({
      enteredTitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern("^[A-Z][a-zA-Z0-9\\s\W]*$")]],
      enteredDescription: ['', [Validators.required, Validators.maxLength(100)]],
      enteredDepartments: ['', [Validators.required, Validators.maxLength(50)]],
      enteredProgress: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }


  //-------------------------------------------------------------------------------------
  //getters for post create input
  get enteredTitle() {
    return this.postForm.get('enteredTitle');
  }

  get enteredDescription() {
    return this.postForm.get('enteredDescription');
  }

  get enteredDepartments() {
    return this.postForm.get('enteredDepartments');
  }

  get enteredProgress() {
    return this.postForm.get('enteredProgress');
  }
  //-------------------------------------------------------------------------------------

  //validation for post create input
  get titleValidationMessage() {
    if (this.enteredTitle?.touched && this.enteredTitle?.errors?.['required']) {
      return 'Title is required';
    } else if (this.enteredTitle?.touched && this.enteredTitle?.errors?.['pattern']) {
      return 'Title must start with an uppercase letter and can contain both letters and numbers.';
    }
    return '';
  }

  get descriptionValidationMessage() {
    if (this.enteredDescription?.touched && this.enteredDescription?.errors?.['required']) {
      return 'Description is required';
    }
    return '';
  }

  get departmentsValidationMessage() {
    if (this.enteredDepartments?.touched && this.enteredDepartments?.errors?.['required']) {
      return 'Departments is required';
    }
    return '';
  }

  get progressValidationMessage() {
    if (this.enteredProgress?.touched && this.enteredProgress?.errors?.['required']) {
      return 'Progress status is required';
    }
    return '';
  }
  //-------------------------------------------------------------------------------------

  //on create post - calls post service
  onaddpost() {
    if (this.postForm.invalid) {
      if (!this.postForm.value.enteredTitle || !this.postForm.value.enteredDescription || !this.postForm.value.enteredDepartments || !this.postForm.value.enteredProgress) {
        alert('Please fill in all the required fields');
      } else {
        alert('Invalid');
      }
      return;
    } else {
      alert('Posts Successfully Created');
      const username = localStorage.getItem('username');
      this.postservice.addpost_service(
        this.postForm.value.enteredTitle,
        this.postForm.value.enteredDescription,
        this.postForm.value.enteredDepartments,
        this.postForm.value.enteredProgress,
        username 
      );
      this.postForm.reset();
    }
  }
}
