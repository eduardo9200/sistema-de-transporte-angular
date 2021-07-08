import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DadosBusca, ResultadoItinerario, TipoItemBusca } from '../models/pesquisa.model';

const urlAPI = `${environment.urlSistemaTransporteApi}/pesquisa`

@Injectable({
  providedIn: 'root'
})
export class PesquisaItinerarioService {

  constructor(private http: HttpClient) { }

  public buscaItinerario(dadosBusca: DadosBusca): Observable<ResultadoItinerario[]> {
    return this.http.get<ResultadoItinerario[]>(`${urlAPI}/pesquisar/itinerario/${dadosBusca.itemSelecionado.id}/${dadosBusca.textoBusca}`);
  }
}
