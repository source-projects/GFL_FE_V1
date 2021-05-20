import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipDialogComponent } from './slip-dialog.component';

describe('SlipDialogComponent', () => {
  let component: SlipDialogComponent;
  let fixture: ComponentFixture<SlipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlipDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
