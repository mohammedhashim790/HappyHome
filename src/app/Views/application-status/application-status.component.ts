import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserAccountTable} from "../../Bloc/Interfaces/Interfaces";
import {UserAccountService} from "../../Bloc/Services/UserAccount/user-account.service";


export enum ApplicationStatus{
  APPLIED="APPLIED",
  VERIFICATION="VERIFICATION",
  APPROVED="APPROVED",
  REJECTED="REJECTED"
}


@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css']
})
export class ApplicationStatusComponent implements OnInit {

  applicationStatus:any;

  ApplicationStatus = ApplicationStatus;

  applicationID:number = 0;

  application:UserAccountTable | null = null;

  constructor(private routerParams:ActivatedRoute,private userAccountService:UserAccountService) {

    this.applicationID = this.routerParams.snapshot.queryParamMap.get('id') as unknown as number;
    console.log(this.applicationID);

    this.readData();
  }

  ngOnInit(): void {
  }

  readData(){
    this.userAccountService.GetAccountById(this.applicationID).subscribe((res)=>{
      this.application = res;
      this.applicationStatus = this.application.status;
    },error => {
      console.error("Not FFound");
    })
  }
}
