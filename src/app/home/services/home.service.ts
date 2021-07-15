import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuantidadesTiposDeLinha, TabelaHome } from '../models/home.model';

const urlApi: string = `${environment.urlSistemaTransporteApi}/home`;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  public montaTabelaHome(): Observable<TabelaHome[]> {
    return this.http.get<TabelaHome[]>(`${urlApi}/buscar-dados`);
  }

  public buscaQuantidadesTiposDeLinha(): Observable<QuantidadesTiposDeLinha[]> {
    return this.http.get<QuantidadesTiposDeLinha[]>(`${urlApi}/buscar-quantitativos-tipos-de-linha`);
  }
}
