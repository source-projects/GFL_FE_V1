import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDyeingProcessStepComponent } from './add-dyeing-process-step.component';

describe('AddDyeingProcessStepComponent', () => {
  let component: AddDyeingProcessStepComponent;
  let fixture: ComponentFixture<AddDyeingProcessStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDyeingProcessStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDyeingProcessStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
