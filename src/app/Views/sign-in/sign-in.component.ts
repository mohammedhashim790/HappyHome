import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router"
import {UserService} from "../../Bloc/Services/User/user.service";
import {UserTable} from "../../Bloc/Interfaces/Interfaces";
import {UserParams} from "../../Bloc/UserParams";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  details:FormGroup;
  passwordHidden: boolean = true;

  constructor(private router:Router,private userService:UserService) {
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

    let res:UserTable = {
      emailId:this.details.get('username')?.value,
      password:this.details.get('password')?.value
    }
    this.userService.AuthenticateUser(res).subscribe((res)=>{
      console.log(res);
      UserParams.UserParams = res;
      console.log(UserParams.UserParams);
      this.navigateTo('');
    },error => {
      console.error(error);
      this.details.controls['username'].setErrors({
        'invalid':error.error
      });
      setTimeout(()=>{
        this.details.setErrors({});
      },1500);
      UserParams.LogOut();
    })

  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
