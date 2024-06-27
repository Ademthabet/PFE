import { TestBed } from '@angular/core/testing';

import { DemandeMaterielService } from './demande-materiel.service';

describe('DemandeMaterielService', () => {
  let service: DemandeMaterielService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeMaterielService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
