import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Linha } from '../models/linhas.model';

const urlAPI: string = `${environment.urlSistemaTransporteApi}/linha`;

@Injectable({
  providedIn: 'root'
})
export class LinhaService {

  constructor(private http: HttpClient) { }

  public buscaTodasLinhas(): Observable<Linha[]> {
    return this.http.get<Linha[]>(`${urlAPI}/buscar-todas`);
  }

  public buscarLinhaByNumero(numero: number): Observable<Linha> {
    return this.http.get<Linha>(`${urlAPI}/numero/${numero}`);
  }
}
