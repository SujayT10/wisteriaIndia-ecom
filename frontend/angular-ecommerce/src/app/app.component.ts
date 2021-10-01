import { Component } from '@angular/core';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isMenuCollapsed = true;
  public isCollapsed = false;

  public isCategoryCollapsed = true;

  showNavigationArrows = true;
  showNavigationIndicators = false;

  closeResult: string;

  blur: any = 5;

  constructor() {

  }


}
