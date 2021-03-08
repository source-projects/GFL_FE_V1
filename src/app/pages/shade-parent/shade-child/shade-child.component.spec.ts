import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadeChildComponent } from './shade-child.component';

describe('ShadeChildComponent', () => {
  let component: ShadeChildComponent;
  let fixture: ComponentFixture<ShadeChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadeChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadeChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
