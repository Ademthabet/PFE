import { TestBed } from '@angular/core/testing';

import { BureauService } from './bureau.service';

describe('BureauService', () => {
  let service: BureauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BureauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
