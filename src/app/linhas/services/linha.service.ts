import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosBuscaLinha } from 'src/app/pesquisa/models/pesquisa.model';
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

  public buscarLinha(dadosBusca: DadosBuscaLinha): Observable<Linha[]> {
    return this.http.get<Linha[]>(`${urlAPI}/pesquisar/${dadosBusca.itemSelecionado.id}/${dadosBusca.textoBusca}`);
  }

  public salvaLinha(linha: Linha): Observable<Linha> {
    return this.http.post<Linha>(`${urlAPI}/salva-linha`, linha);
  }

  public deleteLinha(linha: Linha): Observable<any> {
    return this.http.delete<any>(`${urlAPI}/delete/id/${linha.id}`);
  }
}
