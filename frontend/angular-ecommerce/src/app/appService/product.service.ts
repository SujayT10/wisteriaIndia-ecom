import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = environment.apiUrl + '/products';
  // private baseUrl = 'http://localhost:8081/api/products?size=100';
  private categoryUrl = environment.apiUrl + '/product-category';


  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: any, theProductName: any): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;// Build URL for catergory id
    return this.getProducts(searchUrl);    // console.log("serch URl: " + searchUrl);

  }

  searchProduct(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;// Build URL for Keyword
    return this.getProducts(searchUrl);      // console.log("serch URl: " + searchUrl);

  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductListPaginate(thePage:number, thePageSize:number,
                         theCategoryId: number,theCategoryName:string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                       + `&page=${thePage}&size=${thePageSize}`;  // Build URL for catergory id, page and page size
    return this.httpClient.get<GetResponseProducts>(searchUrl);      //console.log("serch URl: " + searchUrl);

  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page:{
    size:number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
