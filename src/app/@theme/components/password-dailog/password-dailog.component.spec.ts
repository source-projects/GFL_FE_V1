import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordDailogComponent } from './password-dailog.component';

describe('PasswordDailogComponent', () => {
  let component: PasswordDailogComponent;
  let fixture: ComponentFixture<PasswordDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
