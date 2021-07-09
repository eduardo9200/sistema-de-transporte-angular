import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Linha } from 'src/app/linhas/models/linhas.model';
import { environment } from 'src/environments/environment';

const urlAPI: string = `${environment.urlSistemaTransporteApi}/linha`;

@Injectable({
  providedIn: 'root'
})
export class PesquisaLinhasService {

  constructor(private http: HttpClient) { }

  public buscaTodasLinhas(): Observable<Linha[]> {
    return this.http.get<Linha[]>(`${urlAPI}/buscar-todas`);
  }

  public buscarLinhaByNumero(numero: number): Observable<Linha> {
    return this.http.get<Linha>(`${urlAPI}/numero/${numero}`);
  }
}
