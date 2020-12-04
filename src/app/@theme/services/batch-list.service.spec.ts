import { TestBed } from '@angular/core/testing';

import { BatchListService } from './batch-list.service';

describe('BatchListService', () => {
  let service: BatchListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
