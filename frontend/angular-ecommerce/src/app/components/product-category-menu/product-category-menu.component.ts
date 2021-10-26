import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/appService/product.service';
import { ProductCategory } from 'src/app/common/product-category';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  public isMenuCollapsed = true;
  public isCollapsed = false;
  active = 1;

  productCategory: ProductCategory[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
   this.productService.getProductCategories().subscribe(
     data => {
       this.productCategory = data;  //  console.log('Product Data= ' + JSON.stringify(data));
     });
  }


}
