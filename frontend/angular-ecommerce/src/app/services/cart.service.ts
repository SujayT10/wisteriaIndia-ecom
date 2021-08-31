import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    // check if we have item in cart
    let alredyExistsInCart: boolean = false;
    let existingCartItem: any = undefined;

    if (this.cartItems.length > 0) {
      //find the item in cart by their id
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id == theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
      //check if we found it
      alredyExistsInCart = (existingCartItem != undefined)
    }

    if (alredyExistsInCart) {
      //increment quantity
      existingCartItem.quantity++;
    }
    else {
      //add the item in array
      this.cartItems.push(theCartItem);
    }

    //compute cart totl price and total totalQuantity
    this.computeCartTotals();

  }

  computeCartTotals(){
    let totalPriceValue:number= 0;
    let totalQuantityValue:number=0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue +=currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
      // publis new data and all subscriber will recive new data
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);

      //for debugging purposes
      this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue:number, totalQuantityValue:number){
    console.log("Contents of the cart");
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity},
                  unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)},
                 totalQuantity: ${totalQuantityValue}`);

    console.log("-----");
  }
}
