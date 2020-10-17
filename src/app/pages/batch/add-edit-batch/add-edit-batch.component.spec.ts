import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBatchComponent } from './add-edit-batch.component';

describe('AddEditBatchComponent', () => {
  let component: AddEditBatchComponent;
  let fixture: ComponentFixture<AddEditBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
