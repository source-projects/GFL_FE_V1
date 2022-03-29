import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSlipComponent } from './new-slip.component';

describe('NewSlipComponent', () => {
  let component: NewSlipComponent;
  let fixture: ComponentFixture<NewSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
