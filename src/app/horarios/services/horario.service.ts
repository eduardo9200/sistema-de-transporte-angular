import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosBuscaLinha } from 'src/app/pesquisa/models/pesquisa.model';
import { environment } from 'src/environments/environment';
import { Horario } from '../models/horarios.model';

const urlApi: string = `${environment.urlSistemaTransporteApi}/horario`;

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private http: HttpClient) { }

  public buscarHorario(dadosBusca: DadosBuscaLinha): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${urlApi}/buscar/${dadosBusca.itemSelecionado.id}/${dadosBusca.textoBusca}`);
  }

  public salvaHorario(horario: Horario): Observable<any> {
    return this.http.post<any>(`${urlApi}/salvar-horario`, horario);
  }

  public deleteHorario(horario: Horario): Observable<any> {
    return this.http.delete<any>(`${urlApi}/delete/id/${horario.id}`);
  }
}
