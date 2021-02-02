import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningSlipComponent } from './planning-slip.component';

describe('PlanningSlipComponent', () => {
  let component: PlanningSlipComponent;
  let fixture: ComponentFixture<PlanningSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
