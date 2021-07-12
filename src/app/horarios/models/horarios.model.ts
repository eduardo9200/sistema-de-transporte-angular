import { Linha } from "src/app/linhas/models/linhas.model";

export interface Horario {
    id: number;
    linha: Linha;
    inicioDiaUtil: Date;
    fimDiaUtil: Date;
    inicioSabado: Date;
    fimSabado: Date;
    inicioDomingoEFeriado: Date;
    fimDomingoEFeriado: Date;
}
