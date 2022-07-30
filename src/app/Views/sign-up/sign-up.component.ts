import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 details:FormGroup;
  constructor(private router:Router) { 
    this.details=new FormBuilder().group({
      'fullname':new FormControl('',[Validators.required]),
      'Emailid':new FormControl('',[Validators.required]),
      'password':new FormControl('',[Validators.required]),
      'reenterpassword':new FormControl('',[Validators.required])
    }
    );
  }

  ngOnInit(): void {
  }
  OnSignUp(){
    console.log(this.details.value);
    this.details.get("fullname")?.errors
    this.details.get("Emailid")?.errors
  }

}
