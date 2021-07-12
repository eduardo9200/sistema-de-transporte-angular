import { Linha } from "src/app/linhas/models/linhas.model";

export interface Horario {
    id: number;
    linha: Linha;
    inicioDiaUtil: string;
    inicioSabado: string;
    inicioDomingoEFeriado: string;
    fimDiaUtil: string;
    fimSabado: string;
    fimDomingoEFeriado: string;
    intervaloDiaUtil: number;
    intervaloSabado: number;
    intervaloDomingoEFeriado: number;
}
