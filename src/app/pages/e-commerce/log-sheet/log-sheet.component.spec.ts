import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSheetComponent } from './log-sheet.component';

describe('LogSheetComponent', () => {
  let component: LogSheetComponent;
  let fixture: ComponentFixture<LogSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
