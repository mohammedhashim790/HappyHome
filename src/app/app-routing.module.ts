import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Views/home/home.component";
import {SignInComponent} from "./Views/sign-in/sign-in.component";
import {SignUpComponent} from "./Views/sign-up/sign-up.component";
import {RegistrationComponent} from "./Views/registration/registration.component";
import {ApplicationStatusComponent} from "./Views/application-status/application-status.component";
import {AdminConsoleComponent} from "./Views/admin-console/admin-console.component";
import {AdminGuard} from "./Guards/AdminGuard/admin.guard";
import {SignInGuard} from "./Guards/SignInGuard/sign-in.guard";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:'home',
    redirectTo:''
  },
  {
    path:'sign-in',
    component:SignInComponent,
  },
  {
    path:'sign-up',
    component:SignUpComponent,
  },
  {
    path:'registration',
    canActivate:[SignInGuard],
    component:RegistrationComponent,
  },
  {
    path:'status',
    component:ApplicationStatusComponent
  },
  {
    path:'admin',
    // canActivate:[AdminGuard],
    component:AdminConsoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
