import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotReturnViewComponent } from './lot-return-view.component';

describe('LotReturnViewComponent', () => {
  let component: LotReturnViewComponent;
  let fixture: ComponentFixture<LotReturnViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotReturnViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotReturnViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
