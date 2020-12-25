import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadeWithBatchComponent } from './shade-with-batch.component';

describe('ShadeWithBatchComponent', () => {
  let component: ShadeWithBatchComponent;
  let fixture: ComponentFixture<ShadeWithBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadeWithBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadeWithBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
