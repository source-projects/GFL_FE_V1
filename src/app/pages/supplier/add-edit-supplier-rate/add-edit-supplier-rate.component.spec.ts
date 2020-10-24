import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSupplierRateComponent } from './add-edit-supplier-rate.component';

describe('AddEditSupplierRateComponent', () => {
  let component: AddEditSupplierRateComponent;
  let fixture: ComponentFixture<AddEditSupplierRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSupplierRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSupplierRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
