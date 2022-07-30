import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Views/home/home.component";
import {SignInComponent} from "./Views/sign-in/sign-in.component";
import {SignUpComponent} from "./Views/sign-up/sign-up.component";
import {RegistrationComponent} from "./Views/registration/registration.component";
import {ApplicationStatusComponent} from "./Views/application-status/application-status.component";

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
    component:RegistrationComponent,
  },
  {
    path:'status',
    component:ApplicationStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
