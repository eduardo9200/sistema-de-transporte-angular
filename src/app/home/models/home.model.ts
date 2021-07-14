import { Horario } from "src/app/horarios/models/horarios.model";
import { Itinerario } from "src/app/itinerarios/models/itinerario.model";
import { Linha } from "src/app/linhas/models/linhas.model";

export interface TabelaHome {
    linha: Linha;
    itinerario: Itinerario;
    horario: Horario
}