export interface SearchItem {
    id: TipoItemBusca,
    descricao: string
}

export interface SearchItemLinha {
    id: TipoItemBuscaLinha,
    descricao: string;
}

export interface DadosBusca {
    itemSelecionado: SearchItem;
    textoBusca: string;
}

export interface DadosBuscaLinha {
    itemSelecionado: SearchItemLinha;
    textoBusca: string;
}

export enum TipoItemBusca {
    TODOS = 0,
    NUMERO = 1,
    LINHA = 2,
    LOGRADOURO = 3
}
export enum TipoItemBuscaLinha {
    TODAS = 0,
    NUMERO = 1,
    NOME = 2
}