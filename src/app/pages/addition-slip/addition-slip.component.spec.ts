import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionSlipComponent } from './addition-slip.component';

describe('AdditionSlipComponent', () => {
  let component: AdditionSlipComponent;
  let fixture: ComponentFixture<AdditionSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
