//post display component - handles post display

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../post-service.service';
import { PostDeleteComponent } from '../post-delete/post-delete/post-delete.component';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit{
  
  //array of posts
  posts:{
    _id:string,
    title:string,
    description:string,
    departments:string,
    progress:string,
    username:string,
    __v:string
  }[]=[];

  //stores current user's username
  username: string | null = '';

  //constructor
  constructor(public postservice: PostServiceService){}

  //subscription to mange updates from post service
  private postsubscription!: Subscription;

  //initialization
  ngOnInit() {
    //get username
    this.username = localStorage.getItem('username'); 
    //get posts
    this.postservice.getpost_service();
    this.postsubscription = this.postservice.getUpdateListener()
    .subscribe((posts:{
      _id:string,
      title:string,
      description:string,
      departments:string,
      progress:string,
      username:string,
      __v:string
    }[])=>
    {
      this.posts = posts
    });
  }

  //method to unsubcribe from updates
  ngOnDestroy()
  {
    this.postsubscription.unsubscribe();
  }
  
}
