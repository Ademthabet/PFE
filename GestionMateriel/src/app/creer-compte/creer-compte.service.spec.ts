import { TestBed } from '@angular/core/testing';

import { CreerCompteService } from './creer-compte.service';

describe('CreerCompteService', () => {
  let service: CreerCompteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreerCompteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
