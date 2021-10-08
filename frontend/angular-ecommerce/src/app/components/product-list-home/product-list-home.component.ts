import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list-home',
  templateUrl: './product-list-home.component.html',
  styleUrls: ['./product-list-home.component.css']
})
export class ProductListHomeComponent implements OnInit {

  images = [1, 2, 3].map((n) => `assets/images/banner/${n}.jpg`);
  images2 = [4, 5, 1].map((n) => `assets/images/banner/${n}.jpg`);

  constructor() { }

  ngOnInit(): void {
  }

}
