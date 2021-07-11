import { Linha } from "src/app/linhas/models/linhas.model";

export interface Itinerario {
    id?: number;
    linha: Linha;
    descricao: string;
    resumo: string;
    sentido: Sentido;
    pontoInicial: string;
    pontoFinal: string;
}

export enum Sentido {
    IDA = 'IDA',
    VOLTA = 'VOLTA'
}