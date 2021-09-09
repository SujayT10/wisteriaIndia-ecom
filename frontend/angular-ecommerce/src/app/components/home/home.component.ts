import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isMenuCollapsed = true;
  public isCollapsed = false;

  public isCategoryCollapsed = true;

  showNavigationArrows = true;
  showNavigationIndicators = false;

  images = [11, 22, 33].map((n) => `assets/images/banner/${n}.jpg`);

      constructor(config: NgbCarouselConfig) {
      // customize default values of carousels used by this component tree
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
    }

  ngOnInit(): void {
  }

}
