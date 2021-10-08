import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  address1 =`Wisteria India Multitrade Pvt. Ltd.,`
  address2 = `B-106, Janakpuri Katrap Badlapur, Thane 421503`;
  address3 = ` Sai Prasad  Residency CHS A1 Wing Flat no.003 behind  D-wine Hotel Katrap Badlapur East - 421503`

  phoneNumber = `(+91) 738-543-5433`
  email = "customer.care@wisteriaindia.com"
  link = "https://family.wisteriaindia.com/#"
  copyright = ``;
  twitter = "https://twitter.com/WisteriaPvt?s=08"
  insta = "https://www.instagram.com/wisteriaindia/"
  fb = "https://www.facebook.com/profile.php?id=100070738440445"

  constructor() { }

  ngOnInit(): void {
  }

}
