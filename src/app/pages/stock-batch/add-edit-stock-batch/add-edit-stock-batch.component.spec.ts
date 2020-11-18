import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStockBatchComponent } from './add-edit-stock-batch.component';

describe('AddEditStockBatchComponent', () => {
  let component: AddEditStockBatchComponent;
  let fixture: ComponentFixture<AddEditStockBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditStockBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditStockBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
