export interface SearchItem {
    id: TipoItemBusca,
    descricao: string
}

export interface DadosBusca {
    itemSelecionado: SearchItem;
    textoBusca: string;
}

export interface ResultadoItinerario {
    numeroLinha: number;
    nomeLinha?: string;
    itinerario?: string;
    resumoItinerario?: string;
    sentido?: Sentido;
    linhaAtiva?: boolean;
}

export enum Sentido {
    IDA = 'I',
    VOLTA = 'V'
}

export enum TipoItemBusca {
    NUMERO = 1,
    LINHA = 2,
    LOGRADOURO = 3
}