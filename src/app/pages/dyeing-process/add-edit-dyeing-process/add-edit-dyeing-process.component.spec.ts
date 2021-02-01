import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDyeingProcessComponent } from './add-edit-dyeing-process.component';

describe('AddEditDyeingProcessComponent', () => {
  let component: AddEditDyeingProcessComponent;
  let fixture: ComponentFixture<AddEditDyeingProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDyeingProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDyeingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
