import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';
import { FormValidator } from 'src/app/validators/form-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  checkoutFormGroup: FormGroup;

  storage: Storage = sessionStorage;

  // options: any
  orderID: any;

  constructor(private formBuilder: FormBuilder, private formService: FormService,
              private cartService: CartService, private checkoutService: CheckoutService, private router: Router) { }

  ngOnInit(): void {

    // read  the user's email form session storage
    const theEmail = JSON.parse(this.storage.getItem("userEmail"));

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.noWhiteSpaces]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.noWhiteSpaces]),
        email: new FormControl(theEmail, [Validators.required,
                                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.noWhiteSpaces]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.noWhiteSpaces]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.noWhiteSpaces])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.noWhiteSpaces]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.noWhiteSpaces]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.noWhiteSpaces])
      })

    });

    // populate credit card months
    const startMonth = new Date().getMonth() + 1; // console.log("Start Month: " + startMonth);
    this.formService.getCreditCardMonth(startMonth).subscribe(
      data => {
        this.creditCardMonth = data;  // console.log("Resived credit card month:" + JSON.stringify(data));
      });

    // populate credit card years
    this.formService.getCreditCardYear().subscribe(
      data => {
        this.creditCardYear = data; // console.log("resived Credit card year: " + JSON.stringify(data));
      });

    // populate the countries
    this.formService.getCountries().subscribe(
      data => {
        this.countries = data; // console.log("resived countries: " + JSON.stringify(data));
      });

      this.reviewCartDetails();

  }

  reviewCartDetails() {
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
     // subscribe to cartService.totalPrice
     this.cartService.totalPrice.subscribe(
       totalPrice => this.totalPrice = totalPrice
     );
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName') }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName') }
  get email() { return this.checkoutFormGroup.get('customer.email') }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street') }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city') }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state') }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country') }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode') }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street') }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city') }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state') }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country') }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode') }

  // get creditCardType() { return this.checkoutFormGroup.get('creditCartInfo.cardType') }
  // get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCartInfo.nameOnCard') }
  // get creditCardNumber() { return this.checkoutFormGroup.get('creditCartInfo.cardNumber') }
  // get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCartInfo.securityCode') }

  onSubmit() {
    // console.log('I am From checkout component');
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart cartItems
    const cartItems = this.cartService.cartItems;

    // crate orderItems from cartItems
    let orderItems: OrderItem[] = cartItems.map(item => new OrderItem(item)); //--shortWay

    // let orderItemsLong: OrderItem[] = [];
    // for (let i = 0; i < cartItems.length; i++) {
    //   orderItemsLong[i] = new OrderItem(cartItems[i]);
    // }

    // set up  purchase
    let purchase = new Purchase();

    // pupulate purchase -- customer
    purchase.customer = this.checkoutFormGroup.controls["customer"].value;

    // pupulate purchase -- shippingAddress
    purchase.shippingAddress = this.checkoutFormGroup.controls["shippingAddress"].value;
    const shippingState: State =JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country =JSON.parse(JSON.stringify(purchase.shippingAddress.country));

    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // pupulate purchase -- billingAddress
    purchase.billingAddress = this.checkoutFormGroup.controls["billingAddress"].value;
    const billingState: State =JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country =JSON.parse(JSON.stringify(purchase.billingAddress.country));

    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // pupulate purchase -- order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via checkoutService
    this.checkoutService.placeOrder(purchase).subscribe({
        next:response =>{
          alert(`Your order hase been recived.\nOrder Traking number: ${response.orderTrakingNumber}`);
          this.orderID = response.orderTrakingNumber;
          this.resetCart();
        },
        error: err =>{
          alert(`There was an error: ${err.message}`);
        }
      });

    //   let options = {
    //     "key": "rzp_live_MRlPp7s8awXv3r", // Enter the Key ID generated from the Dashboard
    //     "amount": "500", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //     "currency": "INR",
    //     "name": "Wisteria India",
    //     "description": "Test Transaction",
    //     "image": "assets/images/LogoSiteBlack.png",
    //     "order_id": "this.orderID", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //     "handler": function (response: any){
    //         alert(response.razorpay_payment_id);
    //         alert(response.razorpay_order_id);
    //         alert(response.razorpay_signature)
    //     },
    //     "prefill": {
    //         "name": "this.firstName",
    //         "email": "this.email",
    //         "contact": "9975205714"
    //     },
    //     "notes": {
    //         "address": "Razorpay Corporate Office"
    //     },
    //     "theme": {
    //         "color": "#3399cc"
    //     }
    // };

    // let rzp1 = new this.checkoutService.nativeWindow.Razorpay(options);
    // rzp1.open();

  }
  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl("/products");
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      // bug fixed code
      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      // bug fixed code
      this.billingAddressStates = [];
    }
  }

  handelMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCartInfo');
    const currentYear: number = new Date().getFullYear();
    const selectYear: number = Number(creditCardFormGroup.value.expressionYear);

    let startMonth: number;
    if (currentYear === selectYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }
    this.formService.getCreditCardMonth(startMonth).subscribe(
      data => {
        // console.log("FromHandel method revised month and year: " + JSON.stringify(data));
        this.creditCardMonth = data;
      });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    // console.log(`${formGroupName} country code: ${countryCode}`);
    // console.log(`${formGroupName} country Name: ${countryName}`);

    this.formService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        // select 1st state as default
        formGroup.get('state').setValue(data[0]);
      });

  }


  pay(){

  }

}
