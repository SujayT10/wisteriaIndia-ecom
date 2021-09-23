import { Injectable } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  // storage: Storage = sessionStorage;
  storage: Storage = localStorage;

  constructor(private modalService: NgbModal ) {
    // read the data from storage
    let data = JSON.parse(this.storage.getItem('cartItems'));
    if(data != null){
      this.cartItems = data;
      this.computeCartTotals();
    }
  }

  addToCart(theCartItem: CartItem){
    // check if we have item in cart
    let alredyExistsInCart: boolean = false;
    let existingCartItem: any = undefined;

    if (this.cartItems.length > 0) {
      //find the item in cart by their id
      //refactore code
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItem.id);
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
      this.totalPrice.next(totalPriceValue);      // publis new data and all subscriber will recive new data
      this.totalQuantity.next(totalQuantityValue);

      this.logCartData(totalPriceValue, totalQuantityValue);      //for debugging purposes

      this.persistCartItems()  //persist cart data
  }

  persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }

  logCartData(totalPriceValue:number, totalQuantityValue:number){
    // console.log("Contents of the cart");
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      // console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity},
      //             unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`);
    }
    // console.log(`totalPrice: ${totalPriceValue.toFixed(2)},
    //              totalQuantity: ${totalQuantityValue}`);

    // console.log("-----");
  }

  decrementQuantity(theCartItem : CartItem){
    theCartItem.quantity--;

    if(theCartItem.quantity === 0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartTotals();
    }
  }

  remove(theCartItem : CartItem){
    // get index item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem =>tempCartItem.id === theCartItem.id);

    // if found, then remove item form array at given index
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }

  }

  closeResult = '';

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
