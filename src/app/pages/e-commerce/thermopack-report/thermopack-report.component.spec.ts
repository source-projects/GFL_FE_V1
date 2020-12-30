import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermopackReportComponent } from './thermopack-report.component';

describe('ThermopackReportComponent', () => {
  let component: ThermopackReportComponent;
  let fixture: ComponentFixture<ThermopackReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThermopackReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermopackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
