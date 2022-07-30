import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GenApplicationID} from "../../Bloc/Bloc";

export enum ApplicationState{
  PERSONAL,
  INCOME,
  LOAN,
  DOCUMENTS,
  REVIEW,
  SUBMITTED
}

export interface PersonalDetails{
  firstName:string;
  middleName:string;
  lastName:string;
  emailId:string;
  phNumber:number;
  DOB:string;
  gender:string;
  nationality:string;
  aadharNo:string;
  panId:string;
}


export interface Application{

}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  applicationState = ApplicationState;
  currentApplicationState = ApplicationState.PERSONAL ;

  details:FormGroup;

  get personalForm(){
    return this.details.controls["personal"];
  }

  get incomeForm(){
    return this.details.controls["income"];
  }

  get loanForm(){
    return this.details.controls["loan"];
  }

  get documentsForm(){
    return this.details.controls["documents"];
  }

  constructor(private router:Router) {
    this.details = new FormBuilder().group({
      applicationId:GenApplicationID(),
      personal:new FormGroup({
        firstName:new FormControl('',[Validators.required]),
        middleName:new FormControl(''),
        lastName:new FormControl('',[Validators.required]),
        emailId:new FormControl('',[Validators.required,Validators.email]),
        phNumber:new FormControl('',[Validators.required,Validators.pattern("[0-9]{10}")]),
        DOB:new FormControl('',[Validators.required,Validators.required]),
        gender:new FormControl('',[Validators.required]),
        nationality:new FormControl('',[Validators.required]),
        aadharNo:new FormControl('',[Validators.required]),
        panId:new FormControl('',[Validators.required]),
      }),
      income:new FormGroup({
        employmentType:new FormControl('',[Validators.required]),
        retire:new FormControl('',[Validators.required,Validators.pattern("[0-9]{2}")]),
        organization:new FormControl('',[Validators.required]),
        employerName:new FormControl('',[Validators.required]),
        propertyLocation:new FormControl('',[Validators.required]),
        propertyName:new FormControl('',[Validators.required]),
        estimatedCost:new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,}")]),
      }),
      loan:new FormGroup({
        tenure:new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,}")]),
        loanAmount:new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,}")])
      }),
      documents:new FormGroup({
        panId:new FormControl('',[Validators.required]),
        voterId:new FormControl('',[Validators.required]),
        salarySlip:new FormControl('',[Validators.required]),
        LOA:new FormControl('',[Validators.required]),
        NOC:new FormControl('',[Validators.required]),
        saleAgreement:new FormControl('',[Validators.required]),
      })
    })
  }

  controlValid(form: AbstractControl, key: string){
    return form.get(key)?.errors && (form.get(key)?.touched || form.get(key)?.dirty);
  }

  ngOnInit(): void {
  }

  MoveTo(state:ApplicationState){
    if(state<this.currentApplicationState)
      this.currentApplicationState = state;
  }

  ProceedToNext() {
    if(this.currentApplicationState<4) {
      this.currentApplicationState++;
      document.getElementById("canister")!.scrollIntoView();
      if(this.currentApplicationState == 3){
        this.details.disable();
      }
    }
  }

  Register() {
    console.log(this.details.value);
    this.currentApplicationState = ApplicationState.SUBMITTED;
  }
}
