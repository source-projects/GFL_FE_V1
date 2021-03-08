import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadeDataTableComponent } from './shade-data-table.component';

describe('ShadeDataTableComponent', () => {
  let component: ShadeDataTableComponent;
  let fixture: ComponentFixture<ShadeDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadeDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadeDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
