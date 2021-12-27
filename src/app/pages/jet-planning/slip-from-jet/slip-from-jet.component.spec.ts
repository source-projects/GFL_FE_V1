import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipFromJetComponent } from './slip-from-jet.component';

describe('SlipFromJetComponent', () => {
  let component: SlipFromJetComponent;
  let fixture: ComponentFixture<SlipFromJetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlipFromJetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipFromJetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
