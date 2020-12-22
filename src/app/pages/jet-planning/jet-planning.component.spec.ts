import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JetPlanningComponent } from './jet-planning.component';

describe('JetPlanningComponent', () => {
  let component: JetPlanningComponent;
  let fixture: ComponentFixture<JetPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JetPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JetPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
