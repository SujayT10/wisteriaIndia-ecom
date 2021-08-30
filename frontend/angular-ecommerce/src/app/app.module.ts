import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './service/product.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductCategoryMenuComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
