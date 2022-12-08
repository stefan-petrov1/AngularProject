import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPostComponent } from './catalog-post.component';

describe('CatalogPostComponent', () => {
  let component: CatalogPostComponent;
  let fixture: ComponentFixture<CatalogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
