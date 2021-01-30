import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeingProcessComponent } from './dyeing-process.component';

describe('DyeingProcessComponent', () => {
  let component: DyeingProcessComponent;
  let fixture: ComponentFixture<DyeingProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyeingProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DyeingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
