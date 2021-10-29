import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategorySidebarComponent } from './product-category-sidebar.component';

describe('ProductCategorySidebarComponent', () => {
  let component: ProductCategorySidebarComponent;
  let fixture: ComponentFixture<ProductCategorySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategorySidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategorySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
