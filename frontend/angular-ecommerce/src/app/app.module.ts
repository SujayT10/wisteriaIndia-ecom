import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './service/product.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import myAppConfig from './config/my-app-config';
import { Router } from '@angular/router';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { PrivacyPolicyComponent } from './policy/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './policy/terms-and-conditions/terms-and-conditions.component';
import { CancellationRefundPolicyComponent } from './policy/cancellation-refund-policy/cancellation-refund-policy.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProductListHomeComponent } from './components/product-list-home/product-list-home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth: any, injector: any) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductCategoryMenuComponent,
    PageNotFoundComponent,
    CartStatusComponent,
    CartDetailsComponent,
    FooterComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent,
    HomeComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    CancellationRefundPolicyComponent,
    ProductListHomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    TestimonialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    OktaAuthModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
     MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    FlexLayoutModule,
    CarouselModule

  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: oktaConfig },
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
