import { Injectable } from '@angular/core';
import { DadosBusca, DadosBuscaLinha, SearchItem, SearchItemLinha, TipoItemBusca, TipoItemBuscaLinha } from '../models/pesquisa.model';

@Injectable({
  providedIn: 'root'
})
export class PesquisaBuilder {

  constructor() { }

  public getSearchOptions(): SearchItem[] {
    return [
      {
        id: TipoItemBusca.TODOS,
        descricao: 'Todos'
      },
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

  public getDadosBuscaTodos(): DadosBusca {
    return {
      itemSelecionado: { id: TipoItemBusca.TODOS, descricao: 'Todos' },
      textoBusca: 'Todos'
    }
  }

  public getSearchOptionsLinha(): SearchItemLinha[] {
    return [
      {
        id: TipoItemBuscaLinha.TODAS,
        descricao: 'Todos'
      },
      {
        id: TipoItemBuscaLinha.NUMERO,
        descricao: 'Número'
      },
      {
        id: TipoItemBuscaLinha.NOME,
        descricao: 'Nome'
      }
    ];
  }

  public getDadosBuscaTodasLinhas(): DadosBuscaLinha {
    return {
      itemSelecionado: { id: TipoItemBuscaLinha.TODAS, descricao: 'Todas' },
      textoBusca: 'Todas'
    }
  }
}
