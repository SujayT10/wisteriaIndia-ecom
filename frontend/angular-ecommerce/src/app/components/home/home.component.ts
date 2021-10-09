import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  images = [1,2,3,4].map((n) => `assets/images/banner/slider/${n}.jpg`);

  constructor() { }

  ngOnInit(): void {
  }



}
