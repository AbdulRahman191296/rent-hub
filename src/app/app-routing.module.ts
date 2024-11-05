import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CreatePostComponent } from './create-post/create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { authGuard } from './auth-guard/auth.guard';

const routes: Routes = [{
  path: 'login', component: LoginComponent
},
{
  path: 'sign-up', component: RegisterComponent
},
{
  path: 'create-post', component: CreatePostComponent, canActivate: [authGuard]
},
{
  path: 'home', component: HomeComponent
},
{
  path: 'details', component: DetailsComponent, canActivate: [authGuard]
},
{
  path: '', component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
