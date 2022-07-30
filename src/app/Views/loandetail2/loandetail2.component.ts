import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GenApplicationID} from "../../Bloc/Bloc";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loandetail2',
  templateUrl: './loandetail2.component.html',
  styleUrls: ['./loandetail2.component.css']
})
export class Loandetail2Component implements OnInit {

  @Input() applicationDetails:FormGroup | undefined;

  constructor(private router:Router) {
  }

  ngOnInit(): void {

  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
