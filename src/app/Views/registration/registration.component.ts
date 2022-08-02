import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GenApplicationID} from "../../Bloc/Bloc";
import {UserAccountService} from "../../Bloc/Services/UserAccount/user-account.service";
import {UserAccountTable} from "../../Bloc/Interfaces/Interfaces";
import {ApplicationStatus} from "../application-status/application-status.component";

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

const reqMap = {
  "account_ID": "",
  "status": "",
  "signature": "",
  "UserTable": {
    "firstName": "",
    "middleName": "",
    "lastName": "",
    "emailId": "",
    "password": "",
    "phNumber": 0,
    "dob": "",
    "gender": "",
    "nationality": "",
    "adharNo": "",
    "panId": "",
    "token": ""
  },
  "UserLoan": {
    "amount": 0,
    "due_Date": "",
    "next_Due_Date": "",
    "remaining_Amount": 0,
    "date_Sanctioned": "",
    "loanDetails": {
      "amount_Required": 0,
      "tenure": "",
      "no_of_installments": 0,
      "reference_Number": 0,
      "loanAmount": 0,
      "elgible_Amount": 0,
      "roi": 0
    },
    "userBank": {
      "bank_Name": "",
      "account_Number": "",
      "address": "",
      "ifsc": ""
    },
    "incomeDetails": {
      "current_Sallary": 0,
      "propertyLocation": "",
      "employerName": "",
      "estimatedCost": 0,
      "occupation": "",
      "employer_Name": "",
      "employmentType": "",
      "retire": 0,
      "propertyName": ""
    },
    "documentDetails": "",
    "userDetails": ""
  }
};



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  applicationState = ApplicationState;
  currentApplicationState = ApplicationState.PERSONAL ;

  details:FormGroup;



  get userTableForm(){
    return this.details.controls["userTable"];
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

  constructor(private router:Router,private accountService:UserAccountService) {
    this.details = new FormBuilder().group({
      account_ID:GenApplicationID(),
      userTable:new FormGroup({
        firstName:new FormControl('',[Validators.required]),
        middleName:new FormControl(''),
        lastName:new FormControl('',[Validators.required]),
        emailId:new FormControl('',[Validators.required,Validators.email]),
        phNumber:new FormControl('',[Validators.required,Validators.pattern("[0-9]{10}")]),
        dob:new FormControl('',[Validators.required,Validators.required]),
        gender:new FormControl('',[Validators.required]),
        nationality:new FormControl('',[Validators.required]),
        adharNo:new FormControl('',[Validators.required]),
        panId:new FormControl('',[Validators.required]),
      }),
      income:new FormGroup({
        employmentType:new FormControl('',[Validators.required]),
        retire:new FormControl('',[Validators.required,Validators.pattern("[0-9]{2}")]),
        organization:new FormControl('',[Validators.required]),
        employerName:new FormControl('',[Validators.required]),
        propertyLocation:new FormControl('',[Validators.required]),
        propertyName:new FormControl('',[Validators.required]),
        current_Sallary:new FormControl(0,),
        estimatedCost:new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,}")]),
      }),
      loan:new FormGroup({
        tenure:new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,}")]),
        loanAmount:new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,}")]),
        bank_Name:new FormControl('',[]),
        account_Number:new FormControl('',[]),
        address:new FormControl('',[]),
        ifsc:new FormControl('',[]),
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

    let query = this.InitializeData();

    console.log("Submitting Form");
    console.log(query);
    this.accountService.CreateNewAccount(query).subscribe((resp)=>{
      console.log("Submitted Form");
      this.currentApplicationState = ApplicationState.SUBMITTED;
    },error => {
      console.error("Error Creating New User Account");
      console.error(error);
    })

    // this.currentApplicationState = ApplicationState.SUBMITTED;
  }

  InitializeData(){
    let req = {
      "account_ID": this.details.get('account_ID')?.value,
      "status": ApplicationStatus.APPLIED,
      "UserTable": this.userTableForm.value,
      "UserLoan": {
        "amount": 0,
        "due_Date": "0001-01-01T00:00:00",
        "next_Due_Date": "0001-01-01T00:00:00",
        "remaining_Amount": 0,
        "date_Sanctioned": "0001-01-01T00:00:00",
        "loanDetails": {
          "amount_Required": this.loanForm.get('loanAmount')?.value,
          "tenure": this.loanForm.get('tenure')?.value,
          "no_of_installments": 0,
          "reference_Number": 0,
          "loanAmount": 0,
          "elgible_Amount": 0,
          "roi": 0
        },
        "userBank": {
          "bank_Name": "",
          "account_Number": "",
          "address": "",
          "ifsc": ""
        },
        "incomeDetails": this.incomeForm.value,
        "documentDetails": null,
        "userDetails": null
      }
    }


    return req as UserAccountTable;
  }



}
