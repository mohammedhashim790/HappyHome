import {Component, OnInit, ViewChild} from '@angular/core';
import {FloatingWidgetComponent} from "../Widgets/floating-widget/floating-widget.component";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ApplicationStatus} from "../application-status/application-status.component";
import {UserAccountService} from "../../Bloc/Services/UserAccount/user-account.service";
import {UserAccountTable} from "../../Bloc/Interfaces/Interfaces";

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {

  @ViewChild("viewDoc") alertDialog:FloatingWidgetComponent | any;
  @ViewChild("ConfirmUpdate") approveDialog:FloatingWidgetComponent | any;

  applicationStatus = ApplicationStatus;

  // applications:Array<any> = [];

  viewableDocParams = {
    title:'',
    image:false,
    src:''
  }
  viewableDoc: SafeUrl;

  accounts:Array<UserAccountTable> = [];
  selectedIndex:number = -1;

  constructor(public sanitizer:DomSanitizer,private userAccountService:UserAccountService) {
    // this.applications = new Array(100).fill(0).map(((value, index) => index+1));
    // console.log(this.applications);
    this.viewableDoc = this.sanitizer.bypassSecurityTrustResourceUrl('assets/documents/payslip.pdf');
  }

  ngOnInit(): void {
    this.userAccountService.ListUserAccount().subscribe((res)=>{
      this.accounts = res;
      console.log("Accounts");
      if(this.accounts.length>0)
        this.selectedIndex = 0;
      console.log(this.accounts);
    })
  }

  ViewDoc(title:string,image:boolean,src: string) {

    this.viewableDocParams = {
      title: title,
      image: image,
      src:src
    }

    this.alertDialog.Show();
  }

  sanitize(src:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(src)
  }

  onUpdateStatus(value: string) {
    console.log(value);
    if(value == this.applicationStatus.APPROVED){
      this.approveDialog.Show();

      return;
    }
    let element = this.accounts[this.selectedIndex];
    element.status = value;
    // TODO
    this.userAccountService.UpdateAccount(element.id as number,element).subscribe((res)=>{
      console.log(res);
    },error => {
      console.error(error);
    });
  }

  getValue(key:string){
    if(this.selectedIndex == -1)
      return '';
    return '';
    // return this.accounts[this.selectedIndex][key];
  }

  OnUpdateApprove(value:string) {
    let element = this.accounts[this.selectedIndex];
    element.status = ApplicationStatus.APPROVED;
    element.signature = value
    // TODO
    this.userAccountService.UpdateAccount(element.id as number,element).subscribe((res)=>{
      console.log(res);
      this.approveDialog.Hide();
    },error => {
      console.error(error);
    });
  }
}
