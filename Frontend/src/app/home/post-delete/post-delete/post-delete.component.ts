import { Component, Input } from '@angular/core';
import { PostServiceService } from '../../post-service.service';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent {

  //inputs
  @Input() postId!: string;
  @Input() postUsername!: string;
  username: string | null = '';

  //constructor
  constructor(private postService: PostServiceService) {
    this.username = localStorage.getItem('username');
  }

  //delete post
  ondelete() {
    if (this.postUsername === this.username) {
      this.postService.deletepost_service(this.postId);
    }
  }

}
