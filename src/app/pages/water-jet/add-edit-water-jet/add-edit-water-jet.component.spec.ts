import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWaterJetComponent } from './add-edit-water-jet.component';

describe('AddEditWaterJetComponent', () => {
  let component: AddEditWaterJetComponent;
  let fixture: ComponentFixture<AddEditWaterJetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWaterJetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWaterJetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
