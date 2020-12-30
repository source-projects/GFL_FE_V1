import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerReportComponent } from './boiler-report.component';

describe('BoilerReportComponent', () => {
  let component: BoilerReportComponent;
  let fixture: ComponentFixture<BoilerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoilerReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
