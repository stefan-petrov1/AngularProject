import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPaginationButtonsComponent } from './catalog-pagination-buttons.component';

describe('CatalogPaginationButtonsComponent', () => {
  let component: CatalogPaginationButtonsComponent;
  let fixture: ComponentFixture<CatalogPaginationButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogPaginationButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogPaginationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
