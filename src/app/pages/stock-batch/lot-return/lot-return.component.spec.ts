import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotReturnComponent } from './lot-return.component';

describe('LotReturnComponent', () => {
  let component: LotReturnComponent;
  let fixture: ComponentFixture<LotReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
