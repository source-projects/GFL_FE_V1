import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProcessComponent } from './add-edit-process.component';

describe('AddEditProcessComponent', () => {
  let component: AddEditProcessComponent;
  let fixture: ComponentFixture<AddEditProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
