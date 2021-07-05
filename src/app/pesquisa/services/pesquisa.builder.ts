import { Injectable } from '@angular/core';
import { SearchItem } from '../models/pesquisa.model';

@Injectable({
  providedIn: 'root'
})
export class PesquisaBuilder {

  constructor() { }

  public getSearchOptions(): SearchItem[] {
    return [
      {
        id: 1,
        descricao: 'Número'
      },
      {
        id: 2,
        descricao: 'Linha'
      },
      {
        id: 3,
        descricao: 'Logradouro'
      }
    ];
  }
}
