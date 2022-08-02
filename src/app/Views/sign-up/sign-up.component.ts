import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {GenApplicationID} from "../../Bloc/Bloc";
import {UserTable} from "../../Bloc/Interfaces/Interfaces";
import {UserParams} from "../../Bloc/UserParams";
import {UserService} from "../../Bloc/Services/User/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  /**
   * FormGroup which collects User Details
   */
  details:FormGroup;
  formSubmitted: boolean = false;
  constructor(private router:Router,private userService:UserService) {
    this.details=new FormBuilder().group({
      'fullName':new FormControl('',[Validators.required]),
      'emailId':new FormControl('',[Validators.required]),
      'password':new FormControl('',[Validators.required]),
      'confirmPassword':new FormControl('',[Validators.required])
    }
    );
  }

  /**
   * Validate Field
   * @param key
   */
  isValid(key:string){
    return (this.details.controls[key].errors && (this.details.controls[key].touched || this.details.controls[key].dirty))
  }

  ngOnInit(): void {
  }

  /**
   * Validates Field and Creates a new User
   * @constructor
   */
  OnSignUp(){
    this.formSubmitted = true;
    let name = this.details.get('fullName')?.value.split(" ");
    let res:UserTable = {
      firstName:(name[0]),
      lastName:(name.length>1)?name[1]:"",
      emailId:this.details.get('emailId')?.value,
      password:this.details.get('password')?.value
    }
    this.userService.CreateUser(res).subscribe((res)=>{
      console.log(res);
      this.navigateTo('sign-in');
    },error => {
      console.error(error);
      this.details.controls['emailId'].setErrors({
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
