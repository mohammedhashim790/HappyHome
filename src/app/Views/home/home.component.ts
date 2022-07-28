import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adCount: number = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      this.adCount = (this.adCount+=1) % 3;
    },2500);
  }

}
