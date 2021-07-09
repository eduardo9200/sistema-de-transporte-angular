import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosBusca, ResultadoItinerario } from 'src/app/pesquisa/models/pesquisa.model';
import { environment } from 'src/environments/environment';
import { Itinerario } from '../models/itinerario.model';

const urlAPI: string = `${environment.urlSistemaTransporteApi}/itinerario`;

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  constructor(private http: HttpClient) { }

  public salvaItinerario(itinerario: Itinerario): Observable<any> {
    return this.http.post<any>(`${urlAPI}/salva-itinerario`, itinerario);
  }

  public buscaItinerario(dadosBusca: DadosBusca): Observable<ResultadoItinerario[]> {
    return this.http.get<ResultadoItinerario[]>(`${urlAPI}/pesquisar/${dadosBusca.itemSelecionado.id}/${dadosBusca.textoBusca}`);
  }
}
