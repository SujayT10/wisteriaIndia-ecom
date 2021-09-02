import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
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

  constructor(private formBuilder: FormBuilder, private formService: FormService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.noWhiteSpaces]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.noWhiteSpaces]),
        email: new FormControl('', [Validators.required,
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
      }),
      creditCartInfo: this.formBuilder.group({
        cardType:  new FormControl('', [Validators.required]),
        nameOnCard:new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.noWhiteSpaces]),
        cardNumber: new FormControl('', [Validators.required,Validators.pattern(`[0-9]{16}`)]),
        securityCode:new FormControl('', [Validators.required,Validators.pattern(`[0-9]{3}`)]),
        expressionMonth: [''],
        expressionYear: [''],
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

  get creditCardType() { return this.checkoutFormGroup.get('creditCartInfo.cardType') }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCartInfo.nameOnCard') }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCartInfo.cardNumber') }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCartInfo.securityCode') }

  onSubmit() {
    // console.log('I am From checkout component');
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    // console.log(this.checkoutFormGroup.get('customer').value);
    // console.log(this.checkoutFormGroup.get('shippingAddress').value);
    // console.log(this.checkoutFormGroup.get('billingAddress').value);
    // console.log(this.checkoutFormGroup.get('creditCartInfo').value);
    // console.log("Shipping Address " + this.checkoutFormGroup.get('shippingAddress').value.country.code);
    // console.log("Billing Address " + this.checkoutFormGroup.get('billingAddress').value.country.name);

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

}
