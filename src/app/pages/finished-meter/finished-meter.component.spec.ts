import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedMeterComponent } from './finished-meter.component';

describe('FinishedMeterComponent', () => {
  let component: FinishedMeterComponent;
  let fixture: ComponentFixture<FinishedMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
