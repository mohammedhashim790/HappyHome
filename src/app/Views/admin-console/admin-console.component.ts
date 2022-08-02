import {Component, OnInit, ViewChild} from '@angular/core';
import {FloatingWidgetComponent} from "../Widgets/floating-widget/floating-widget.component";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ApplicationStatus} from "../application-status/application-status.component";
import {UserAccountService} from "../../Bloc/Services/UserAccount/user-account.service";
import {UserAccountTable} from "../../Bloc/Interfaces/Interfaces";


export type ViewableDocParams = {
  title:string;
  image:boolean;
  src?:any;
}

export enum WidgetState{
  LOADING,
  LOADED,
}

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {

  // Alert Dialog for Viewing Documents
  @ViewChild("viewDoc") alertDialog:FloatingWidgetComponent | any;
  // Alert Dialog To Confirm Approval of Loan
  @ViewChild("ConfirmUpdate") approveDialog:FloatingWidgetComponent | any;

  //Application Status Reference
  applicationStatus = ApplicationStatus;

  // Angular Web Page state for easy transitioning
  state = WidgetState.LOADING;

  // Web Page State Reference
  WidgetState = WidgetState;


  //Alert Dialog Display Params
  viewableDocParams:ViewableDocParams = {
    title:'',
    image:false
  };

  viewableDoc: SafeUrl;


  accounts:Array<UserAccountTable> = [];
  selectedIndex:number = -1;

  constructor(public sanitizer:DomSanitizer,private userAccountService:UserAccountService) {
    this.viewableDoc = this.sanitizer.bypassSecurityTrustResourceUrl('assets/documents/payslip.pdf');
  }

  ngOnInit(): void {
    this.readData('*');
  }

  /**
   * @param title
   * @param image
   * @param src
   * @return
   * @constructor
   *
   * ViewDoc assigns the params to 'viewableDocParams'
   */
  ViewDoc(title:string,image:boolean,src: string) {

    this.viewableDocParams = {
      title: title,
      image: image,
      src:this.sanitizer.bypassSecurityTrustResourceUrl(src)
    }

    this.alertDialog.Show();
  }

  /**
   * @param src
   * Sanitizes DOM Elements from Local Storage Assets
   */
  sanitize(src:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(src)
  }

  /**
   *
   * @param value
   */
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

  /**
   *
   * @param value
   * @constructor
   * Updates Status and Reflects the changes to the user.
   */

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

  /**
   * @param value
   * @constructor
   *
   * ApplyFilter filters value and Accounts Based on Status
   */
  ApplyFilter(value:string){
    console.log(value);
    if(value == "*"){
      this.readData("*")
    }else{
      this.readData(value);
    }
  }

  private readData(filter: string) {
    this.state = WidgetState.LOADING;
    if(filter == '*'){
      this.userAccountService.ListUserAccount().subscribe((res)=>{
        this.accounts = res;
        console.log("Accounts");
        this.selectedIndex = 0;
        console.log(res);
        setTimeout(()=>{
          this.state = WidgetState.LOADED;
        },2500);
      });
    }else{
      this.userAccountService.ListUserAccountByStatus(filter).subscribe((res)=>{
        this.accounts = res;
        console.log("Accounts");
        this.selectedIndex = 0;
        console.log(res);
        setTimeout(()=>{
          this.state = WidgetState.LOADED;
        },2500);
      });
    }

  }

  reload() {
    this.readData('*')
  }
}
