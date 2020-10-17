import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditShadeComponent } from './add-edit-shade.component';

describe('AddEditShadeComponent', () => {
  let component: AddEditShadeComponent;
  let fixture: ComponentFixture<AddEditShadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditShadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditShadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
