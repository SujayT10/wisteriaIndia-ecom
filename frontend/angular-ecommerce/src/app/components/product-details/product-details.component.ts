import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handelProductDetails();
    });

  }
  handelProductDetails() {
    const theProductId: any = this.route.snapshot.paramMap.get('id');
    const theProductName: any = this.route.snapshot.paramMap.get('name');

    this.productService.getProduct(theProductId,theProductName).subscribe(
      data => {
        this.product = data;
      });
  }

}
