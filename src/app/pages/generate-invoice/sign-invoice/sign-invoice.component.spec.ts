import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInvoiceComponent } from './sign-invoice.component';

describe('SignInvoiceComponent', () => {
  let component: SignInvoiceComponent;
  let fixture: ComponentFixture<SignInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
