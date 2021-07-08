import { Injectable } from '@angular/core';
import { SearchItem, TipoItemBusca } from '../models/pesquisa.model';

@Injectable({
  providedIn: 'root'
})
export class PesquisaBuilder {

  constructor() { }

  public getSearchOptions(): SearchItem[] {
    return [
      {
        id: TipoItemBusca.NUMERO,
        descricao: 'Número'
      },
      {
        id: TipoItemBusca.LINHA,
        descricao: 'Linha'
      },
      {
        id: TipoItemBusca.LOGRADOURO,
        descricao: 'Logradouro'
      }
    ];
  }
}
