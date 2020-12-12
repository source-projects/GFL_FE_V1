import { TestBed } from '@angular/core/testing';

import { PrintInvoiceService } from './print-invoice.service';

describe('PrintInvoiceService', () => {
  let service: PrintInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
