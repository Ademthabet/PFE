import { TestBed } from '@angular/core/testing';

import { DateValidationService } from './date-validation.service';

describe('DateValidationService', () => {
  let service: DateValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
