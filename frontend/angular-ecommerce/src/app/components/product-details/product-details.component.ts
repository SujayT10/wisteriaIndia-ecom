import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/appService/cart.service';
import { ProductService } from 'src/app/appService/product.service';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute,
                private router:Router) { }

  open(content: any){
    this.cartService.open(content)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handelProductDetails();
    });

  }
  handelProductDetails() {
    const theProductId: any = this.route.snapshot.paramMap.get('id');
    const theProductName: any = this.route.snapshot.paramMap.get('name');

    this.productService.getProduct(theProductId, theProductName).subscribe(
      data => {
        this.product = data;
      });
  }

  addToCart() {
    console.log(`Adding to Cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

  toCheckout(){
    this.addToCart();
    this.router.navigate(['checkout']);
  }

}
