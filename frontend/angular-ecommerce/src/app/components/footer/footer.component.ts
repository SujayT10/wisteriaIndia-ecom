import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  address1 =`Wisteria India Multitrade Pvt. Ltd.,`
  address2 = `B-106, Janakpuri Katrap Badlapur, Thane 421503`;
  phoneNumber = `Phone: (+123) 123 321 345`

  constructor() { }

  ngOnInit(): void {
  }

}
