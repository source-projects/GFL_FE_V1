import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApcComponent } from './pending-apc.component';

describe('PendingApcComponent', () => {
  let component: PendingApcComponent;
  let fixture: ComponentFixture<PendingApcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingApcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingApcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
