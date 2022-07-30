import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adCount: number = 0;

  emiForm:FormGroup;
  eligibilityForm:FormGroup;

  constructor() {
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
}
