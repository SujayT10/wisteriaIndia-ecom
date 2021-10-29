import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/appService/product.service';
import { ProductCategory } from 'src/app/common/product-category';

@Component({
  selector: 'app-product-category-sidebar',
  templateUrl: './product-category-sidebar.component.html',
  styleUrls: ['./product-category-sidebar.component.css']
})
export class ProductCategorySidebarComponent implements OnInit {

  public isCollapsed = false;
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
