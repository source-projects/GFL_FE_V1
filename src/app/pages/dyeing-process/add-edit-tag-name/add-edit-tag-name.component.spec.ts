import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTagNameComponent } from './add-edit-tag-name.component';

describe('AddEditTagNameComponent', () => {
  let component: AddEditTagNameComponent;
  let fixture: ComponentFixture<AddEditTagNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTagNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTagNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
