import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQualityComponent } from './add-edit-quality.component';

describe('AddEditQualityComponent', () => {
  let component: AddEditQualityComponent;
  let fixture: ComponentFixture<AddEditQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditQualityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
