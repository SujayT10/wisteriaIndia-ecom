
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { environment } from 'src/environments/environment';

function _window() : any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = environment.apiUrl + "/checkout/purchase";

  constructor(private httpClient: HttpClient) { }

  get nativeWindow(): any {
    return _window();
 }

  placeOrder(purchase: Purchase):Observable<any>{

    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }


}
