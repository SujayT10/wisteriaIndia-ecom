import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { FormService } from 'src/app/services/form.service';

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

  constructor(private formBuilder: FormBuilder, private formService: FormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCartInfo: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expressionMonth: [''],
        expressionYear: [''],
      })
    });

    // populate credit card months
    const startMonth = new Date().getMonth() + 1; console.log("Start Month: " + startMonth);
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
        this.countries = data;  console.log("resived countries: " + JSON.stringify(data));
      });

  }

  onSubmit() {
    console.log('I am From checkout component');
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
    console.log(this.checkoutFormGroup.get('billingAddress').value);
    console.log(this.checkoutFormGroup.get('creditCartInfo').value);
    console.log("Shipping Address " + this.checkoutFormGroup.get('shippingAddress').value.country.code);
    console.log("Billing Address "+ this.checkoutFormGroup.get('billingAddress').value.country.name);

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
        console.log("FromHandel method revised month and year: " + JSON.stringify(data));
        this.creditCardMonth = data;
      });
  }

  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country Name: ${countryName}`);

    this.formService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
            this.shippingAddressStates = data;
        }
        else{
          this.billingAddressStates = data;
        }

        // select 1st state as default
        formGroup.get('state').setValue(data[0]);
      });
  }

}
