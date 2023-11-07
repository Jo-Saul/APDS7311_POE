import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'APDS7311';
  username: string | null = '';

  constructor(public authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.authService.username$.subscribe(username => {
      this.username = username; // update the username whenever it changes
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
}

