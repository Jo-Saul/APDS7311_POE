//routing module - defines route for application

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { SignupComponent } from './auth/signup/signup/signup.component';
import { PostCreateComponent } from './home/post-create/post-create.component';
import { PostDisplayComponent } from './home/post-display/post-display.component';
import { AuthGuard } from './auth/auth-guard.service';

//route array
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'}, //redirect empty paths to login
  {path: 'home', component:PostDisplayComponent, canActivate: [AuthGuard]},
  {path: 'create', component:PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: '**', redirectTo: '/login'} //wildcard - if route does not match - direct to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
