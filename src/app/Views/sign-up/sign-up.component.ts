import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {GenApplicationID} from "../../Bloc/Bloc";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 details:FormGroup;
  formSubmitted: boolean = false;
  constructor(private router:Router) {
    this.details=new FormBuilder().group({
      'fullName':new FormControl('',[Validators.required]),
      'emailId':new FormControl('',[Validators.required]),
      'password':new FormControl('',[Validators.required]),
      'confirmPassword':new FormControl('',[Validators.required])
    }
    );
  }

  isValid(key:string){
    return (this.details.controls[key].errors && (this.details.controls[key].touched || this.details.controls[key].dirty))
  }

  ngOnInit(): void {
  }
  OnSignUp(){
    this.formSubmitted = true;
    console.log(GenApplicationID())
    console.log(this.details.value);
  }

  navigateTo(path: string) {

    this.router.navigateByUrl(path);
  }
}
