import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFinishedMeterComponent } from './add-edit-finished-meter.component';

describe('AddEditFinishedMeterComponent', () => {
  let component: AddEditFinishedMeterComponent;
  let fixture: ComponentFixture<AddEditFinishedMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFinishedMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFinishedMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
