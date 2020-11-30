import { TestBed } from '@angular/core/testing';

import { BatchByQualityPartyService } from './batch-by-quality-party.service';

describe('BatchByQualityPartyService', () => {
  let service: BatchByQualityPartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchByQualityPartyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
