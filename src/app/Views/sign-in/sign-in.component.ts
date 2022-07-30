import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  details:FormGroup;
  passwordHidden: boolean = true;

  constructor(private router:Router) {
    this.details=new FormBuilder().group({
      'username':new FormControl('',[Validators.required]),
      'password':new FormControl('',[Validators.required])
    }
      );
  }

  ngOnInit(): void {
  }
  OnLogIn(){
    console.log("logging in")
    console.log(this.details.value);
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
