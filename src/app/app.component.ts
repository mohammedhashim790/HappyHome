import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { UserParams } from './Bloc/UserParams';
import {UserAccountService} from "./Bloc/Services/UserAccount/user-account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HappyHome';

  UserParams = UserParams;

  constructor(private router:Router) {
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  OnSignOut() {
    UserParams.LogOut();
    this.router.navigateByUrl('');
  }

  Check(){

  }
}
