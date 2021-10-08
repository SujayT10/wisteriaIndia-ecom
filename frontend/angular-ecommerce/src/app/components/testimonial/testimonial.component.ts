import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

interface Testimonials{
  quotes:string[];
  name: string[];
  city: string[];
}

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  testimonials: Testimonials = {
    quotes: ['Your most unhappy customers are your most important source of learning',
             'You should learn from your competitor, but never copy. Copy and you die',
             'If you’re competitor-focused, you have to wait until there is a competitor doing something. Being customer-focused allows you to be more pioneering.',],
    name: ['Bill Gates','Jack Ma','Jeff Bezos'],
    city: ['Microsoft Founder','EC Alibaba Group','CEO of Amazon']
  }

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 500000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }


  ngOnInit(): void {
  }

}
