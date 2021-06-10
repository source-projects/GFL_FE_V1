import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeingSlipComponent } from './dyeing-slip.component';

describe('DyeingSlipComponent', () => {
  let component: DyeingSlipComponent;
  let fixture: ComponentFixture<DyeingSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyeingSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DyeingSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
