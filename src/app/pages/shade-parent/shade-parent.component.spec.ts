import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadeParentComponent } from './shade-parent.component';

describe('ShadeParentComponent', () => {
  let component: ShadeParentComponent;
  let fixture: ComponentFixture<ShadeParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadeParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadeParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
