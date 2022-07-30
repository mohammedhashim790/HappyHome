import { Component, OnInit } from '@angular/core';


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

  applicationStatus = ApplicationStatus.REJECTED;

  ApplicationStatus = ApplicationStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
