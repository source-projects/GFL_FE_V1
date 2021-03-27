import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeBatchComponent } from './merge-batch.component';

describe('MergeBatchComponent', () => {
  let component: MergeBatchComponent;
  let fixture: ComponentFixture<MergeBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
