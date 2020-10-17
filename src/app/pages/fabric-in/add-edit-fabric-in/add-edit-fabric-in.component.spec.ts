import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFabricInComponent } from './add-edit-fabric-in.component';

describe('AddEditFabricInComponent', () => {
  let component: AddEditFabricInComponent;
  let fixture: ComponentFixture<AddEditFabricInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFabricInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFabricInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
