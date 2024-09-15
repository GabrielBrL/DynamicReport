import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmsaveComponent } from './confirmsave.component';

describe('ConfirmsaveComponent', () => {
  let component: ConfirmsaveComponent;
  let fixture: ComponentFixture<ConfirmsaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmsaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmsaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
