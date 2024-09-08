import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSelectItemsComponent } from './popup-select-items.component';

describe('PopupSelectItemsComponent', () => {
  let component: PopupSelectItemsComponent;
  let fixture: ComponentFixture<PopupSelectItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupSelectItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupSelectItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
