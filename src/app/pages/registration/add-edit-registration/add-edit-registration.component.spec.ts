import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRegistrationComponent } from './add-edit-registration.component';

describe('AddEditRegistrationComponent', () => {
  let component: AddEditRegistrationComponent;
  let fixture: ComponentFixture<AddEditRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
