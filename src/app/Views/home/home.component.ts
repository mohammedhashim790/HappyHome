import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ListServicesService} from "./list-services.service";
import {UserAccountService} from "../../Bloc/Services/UserAccount/user-account.service";
import {UserParams} from "../../Bloc/UserParams";
import {UserAccountTable} from "../../Bloc/Interfaces/Interfaces";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adCount: number = 0;

  emiForm:FormGroup;
  eligibilityForm:FormGroup;

  UserParams = UserParams;
  trackerId: FormControl = new FormControl('',[Validators.required]);

  constructor(private router:Router,
              private listService:ListServicesService,
              private accountService:UserAccountService) {
    this.emiForm = new FormBuilder().group({
      'loan':new FormControl('',[Validators.required]),
      'tenure':new FormControl('',[Validators.required]),
      'roi':new FormControl('8.5',[Validators.required]),
      'emi':new FormControl('-')
    });
    this.emiForm.controls['emi'].disable();
    this.emiForm.controls['roi'].disable();

    this.eligibilityForm = new FormBuilder().group({
      'loan':new FormControl('',[Validators.required]),
      'roi':new FormControl('0.6',),
      'eligible':new FormControl('-')
    });
    this.eligibilityForm.controls['roi'].disable();
    this.eligibilityForm.controls['eligible'].disable();

  }

  ngOnInit(): void {
    setInterval(()=>{
      this.adCount = (this.adCount+=1) % 3;
    },2500);
  }

  CalculateEMI() {
    console.log(this.emiForm.valid);
    if(!this.emiForm.valid)
      return;
    let loan = Number(this.emiForm.controls['loan'].value)
    let year = Number(this.emiForm.controls['tenure'].value)
    let roi = Number(this.emiForm.controls['roi'].value);
    roi = roi / 100;
    let emi = (loan * roi * (((1+roi)**year)/((1+roi)**(year-1))));
    console.log(emi);
    this.emiForm.controls['emi'].setValue(emi);
  }

  CalculateEligibility() {
    console.log(this.eligibilityForm.valid);
    if(!this.eligibilityForm.valid)
      return;
    let loan = Number(this.eligibilityForm.controls['loan'].value)
    let eligible = 60 * (0.6 * loan) / 100
    console.log(eligible);
    this.eligibilityForm.controls['eligible'].setValue(eligible);
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  TestMethod() {
    console.log("clicked");
    console.log("clicked");
    // this.accountService.ListUserAccount().subscribe((res)=>{
    //   console.log("Results");
    //   console.log(res);
    // })

    let req = {
      "account_ID": "New Account ID",
      "status": "Approved",
      "created_At": "2022-07-31T20:35:31.4305602+05:30",
      "updated_At": "2022-07-31T20:35:31.430623+05:30",
      "signature": "",
      "UserTable": {
        "firstName": null,
        "middleName": null,
        "lastName": null,
        "emailId": "31651",
        "password": null,
        "phNumber": 0,
        "dob": "0001-01-01T00:00:00",
        "gender": null,
        "nationality": null,
        "adharNo": null,
        "panId": null,
        "token": null
      },
      "UserLoan": {
        "amount": 31356165,
        "due_Date": "0001-01-01T00:00:00",
        "next_Due_Date": "0001-01-01T00:00:00",
        "remaining_Amount": 0,
        "date_Sanctioned": "0001-01-01T00:00:00",
        "loanDetails": {
          "amount_Required": 32165432,
          "tenure": null,
          "no_of_installments": 0,
          "reference_Number": 0,
          "loanAmount": 0,
          "elgible_Amount": 0,
          "roi": 0
        },
        "userBank": {
          "bank_Name": "xyz",
          "account_Number": null,
          "address": null,
          "ifsc": null
        },
        "incomeDetails": {
          "current_Sallary": 0,
          "propertyLocation": null,
          "employerName": "jhbibasd",
          "estimatedCost": 0,
          "occupation": null,
          "employer_Name": null,
          "employmentType": null,
          "retire": 0,
          "propertyName": null
        },
        "documentDetails": null,
        "userDetails": null
      }
    };

    console.log(req);

    this.accountService.CreateNewAccount(req as any).subscribe((res)=>{
      console.log(res)
    },error => {
      console.error(error);
    });

  }

  FindLoan() {

    this.accountService.GetAccountByAccountId(this.trackerId.value).subscribe((res)=>{
      this.router.navigate(['status'],{queryParams:{id:res.id}});
    },error => {
      this.trackerId.setErrors({
        'invalid':true
      });
      setTimeout(()=>{
        this.trackerId.setErrors({});
      },2500);
    })

  }
}
