import {Component, OnInit, ViewChild} from '@angular/core';
import {FloatingWidgetComponent} from "../Widgets/floating-widget/floating-widget.component";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ApplicationStatus} from "../application-status/application-status.component";

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {

  @ViewChild("viewDoc") alertDialog:FloatingWidgetComponent | any;
  @ViewChild("ConfirmUpdate") approveDialog:FloatingWidgetComponent | any;

  applicationStatus = ApplicationStatus;

  applications:Array<any> = [];

  viewableDocParams = {
    title:'',
    image:false,
    src:''
  }

  viewableDoc: SafeUrl;

  constructor(public sanitizer:DomSanitizer) {
    this.applications = new Array(100).fill(0).map(((value, index) => index+1));
    console.log(this.applications);
    this.viewableDoc = this.sanitizer.bypassSecurityTrustResourceUrl('assets/documents/payslip.pdf');
  }

  ngOnInit(): void {
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
    // TODO
    // UPDATE THE DATABASE
  }
}
