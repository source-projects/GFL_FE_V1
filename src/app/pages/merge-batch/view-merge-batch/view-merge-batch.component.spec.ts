import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMergeBatchComponent } from './view-merge-batch.component';

describe('ViewMergeBatchComponent', () => {
  let component: ViewMergeBatchComponent;
  let fixture: ComponentFixture<ViewMergeBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMergeBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMergeBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
