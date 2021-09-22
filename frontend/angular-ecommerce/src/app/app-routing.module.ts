import { TermsAndConditionsComponent } from './policy/terms-and-conditions/terms-and-conditions.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { HomeComponent } from './components/home/home.component';
import { PrivacyPolicyComponent } from './policy/privacy-policy/privacy-policy.component';
import { CancellationRefundPolicyComponent } from './policy/cancellation-refund-policy/cancellation-refund-policy.component';

const routes: Routes = [

  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'cancellation-refund-policy', component: CancellationRefundPolicyComponent },

  { path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard] },
  { path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard] },

  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },

  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {path: '**', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/products', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
