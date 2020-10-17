import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditColorComponent } from './add-edit-color.component';

describe('AddEditColorComponent', () => {
  let component: AddEditColorComponent;
  let fixture: ComponentFixture<AddEditColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
