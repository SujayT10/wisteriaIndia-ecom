import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

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

  // for paginations
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElement: number = 0;


  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
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
      this.currentCategoryId = this.route.snapshot.paramMap.get('id');
      // console.log("inside if: " + this.currentCategoryId)

      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
      // console.log("inside if: " + this.currentCategoryId)
    }
    else {
      this.currentCategoryId = 1;
      // console.log("inside else: " + this.currentCategoryId);
      this.currentCategoryName = 'Books';
      // console.log("inside else: " + this.currentCategoryId)
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`Current Category Id: ${this.currentCategoryId} thePageNUmber: ${this.thePageNumber}`)

    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                              this.thePageSize, this.currentCategoryId)
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

}


