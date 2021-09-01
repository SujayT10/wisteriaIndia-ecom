import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
        console.log("Resived credit card month:" + JSON.stringify(data));
        this.creditCardMonth = data;
      });

    // populate credit card years
    this.formService.getCreditCardYear().subscribe(
      data => {
        console.log("resived Credit card year: " + JSON.stringify(data));
        this.creditCardYear = data;
      });

  }

  onSubmit() {
    console.log('I am From checkout component');
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
    console.log(this.checkoutFormGroup.get('billingAddress').value);
    console.log(this.checkoutFormGroup.get('creditCartInfo').value);

  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  handelMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCartInfo');
    const currentYear: number = new Date().getFullYear();
    const selectYear: number = Number(creditCardFormGroup.value.expressionYear);

    let startMonth:number;
    if(currentYear === selectYear){
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }
    this.formService.getCreditCardMonth(startMonth).subscribe(
      data =>{
        console.log("FromHandel method revised month and year: "+ JSON.stringify(data));
        this.creditCardMonth = data;
        });
  }

}
