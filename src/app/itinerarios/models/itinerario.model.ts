import { Linha } from "src/app/linhas/models/linhas.model";
import { Sentido } from "src/app/pesquisa/models/pesquisa.model";

export interface Itinerario {
    linha: Linha;
    descricao: string;
    resumo: string;
    sentido: Sentido;
    pontoInicial: string;
    pontoFinal: string;
}