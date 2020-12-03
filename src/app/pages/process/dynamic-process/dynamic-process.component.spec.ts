import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicProcessComponent } from './dynamic-process.component';

describe('DynamicProcessComponent', () => {
  let component: DynamicProcessComponent;
  let fixture: ComponentFixture<DynamicProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
