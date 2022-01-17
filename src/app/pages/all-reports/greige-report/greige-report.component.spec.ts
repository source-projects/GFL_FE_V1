import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreigeReportComponent } from './greige-report.component';

describe('GreigeReportComponent', () => {
  let component: GreigeReportComponent;
  let fixture: ComponentFixture<GreigeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreigeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreigeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
