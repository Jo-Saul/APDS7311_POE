//post service - handles posts (includes creation, deletion and display)

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  //array of of posts
  private postdisplay:{
    _id:string,
    title:string,
    description:string,
    departments:string,
    progress:string,
    username:string,
    __v:string
  }[] =[];

  //subsription for post updates
  private updatedpostdisplay = new Subject<{
    _id:string,
    title:string,
    description:string,
    departments:string,
    progress:string,
    username:string,
    __v:string
  }[]>();

  //constructor
  constructor(private http: HttpClient) { }

  //method to creat new post
  addpost_service(pTitle:string, pDesc:string, pDepart:string, pProg: string, pUser: string | null)
  {
    this.http.post<{message:string,post:any}>(
      'https://localhost:3000/api/post', //create request
      {
        title:pTitle,
        description:pDesc,
        departments:pDepart,
        progress:pProg,
        username: pUser
      })
      .subscribe((thepost)=>
      {
        //update posts
        this.postdisplay.push(thepost.post);
        this.updatedpostdisplay.next([...this.postdisplay]);
      })
  }

  //method to get posts
  getpost_service(){
    this.http.get<{message:string, post:any}>(
      'https://localhost:3000/api/post')
      .subscribe((thepost)=>
      {
        if (Array.isArray(thepost)) {
          //updates posts
          this.postdisplay = thepost;
          this.updatedpostdisplay.next([...this.postdisplay]);
        } else {
          console.error('thepost is not an array:', thepost);
        }
      })
  }

  //method to delete post by ID
  deletepost_service(postId:string)
  {
    if(window.confirm('Are you sure you want to delete this post?')) {
      this.http.delete('https://localhost:3000/api/post/' + postId)
      .subscribe(()=>
      {
        //update posts
        const updatedpostdeleted = this.postdisplay.filter(post=>post._id!==postId);
        this.postdisplay = updatedpostdeleted;
        this.updatedpostdisplay.next([...this.postdisplay]);
      })
    }
  }

  //observable used to subsribe components to post service
  getUpdateListener()
  {
    return this.updatedpostdisplay.asObservable();
  }
}
