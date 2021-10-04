import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeJetComponent } from './change-jet.component';

describe('ChangeJetComponent', () => {
  let component: ChangeJetComponent;
  let fixture: ComponentFixture<ChangeJetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeJetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeJetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
