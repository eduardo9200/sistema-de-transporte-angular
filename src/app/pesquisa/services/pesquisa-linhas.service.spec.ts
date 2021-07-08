import { TestBed } from '@angular/core/testing';

import { PesquisaLinhasService } from './pesquisa-linhas.service';

describe('PesquisaLinhasService', () => {
  let service: PesquisaLinhasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesquisaLinhasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
