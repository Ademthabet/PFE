import { TestBed } from '@angular/core/testing';

import { LigneDemandeService } from './ligne-demande.service';

describe('LigneDemandeService', () => {
  let service: LigneDemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneDemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
