import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBatchesComponent } from './available-batches.component';

describe('AvailableBatchesComponent', () => {
  let component: AvailableBatchesComponent;
  let fixture: ComponentFixture<AvailableBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableBatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
