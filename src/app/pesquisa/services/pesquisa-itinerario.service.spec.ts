import { TestBed } from '@angular/core/testing';

import { PesquisaItinerarioService } from './pesquisa-itinerario.service';

describe('PesquisaItinerarioService', () => {
  let service: PesquisaItinerarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesquisaItinerarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
