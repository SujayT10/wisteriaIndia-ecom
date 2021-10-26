import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { CartService } from 'src/app/appService/cart.service';
import { ProductService } from 'src/app/appService/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: any;
  previousCategoryId: number = 1;
  currentCategoryName: any;
  searchMode: boolean = false;
  productCategory: ProductCategory[] = [];

  // for paginations
  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElement: number = 0;
  maxSize: number = 2;
  boundaryLinks: boolean = true

  constructor(private productService: ProductService,
              private cartService: CartService, private route: ActivatedRoute, private router:Router) {}

  open(content: any){
    this.cartService.open(content)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategory = data;  //  console.log('Product Data= ' + JSON.stringify(data));
      });
   }

   doSearch(value: string){
    // console.log("Value: "+value);
    this.router.navigateByUrl(`/search/${value}`);

  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleListProducts() {
    // check if id para is avaliable
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = this.route.snapshot.paramMap.get('id');  // console.log("inside if: " + this.currentCategoryId)
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');  // console.log("inside if: " + this.currentCategoryId)
    }
    else {
      this.currentCategoryId = 5;  console.log("inside else: " + this.currentCategoryId);
      this.currentCategoryName = 'Electronics';  console.log("inside else: " + this.currentCategoryName)
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;  //    console.log(`Current Category Id: ${this.currentCategoryId} thePageNUmber: ${this.thePageNumber}`)
    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize, this.currentCategoryId,this.currentCategoryName)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElement = data.page.totalElements;
    };
  }

  handleSearchProducts() {
    const theKeyword: any = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProduct(theKeyword).subscribe(
      data => {
        this.products = data;
      });
  }

  addToCart(theProduct: Product) {
    // console.log(`ProductName: ${theProduct.name} ProductPrice: ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }

  // updatePageSize(pageSize: number) {
  //   this.thePageSize = pageSize;
  //   this.thePageNumber =1;
  //   this.listProducts();
  // // }



}


