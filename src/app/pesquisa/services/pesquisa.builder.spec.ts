import { TestBed } from '@angular/core/testing';

import { PesquisaBuilder } from './pesquisa.builder';

describe('Pesquisa.BuilderService', () => {
  let service: PesquisaBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesquisaBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
