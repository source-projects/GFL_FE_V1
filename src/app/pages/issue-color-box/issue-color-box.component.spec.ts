import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueColorBoxComponent } from './issue-color-box.component';

describe('IssueColorBoxComponent', () => {
  let component: IssueColorBoxComponent;
  let fixture: ComponentFixture<IssueColorBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueColorBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueColorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
