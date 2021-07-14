import { Component, Input, OnInit } from '@angular/core';
import { TabelaHome } from 'src/app/home/models/home.model';

@Component({
  selector: 'app-tabela-home',
  templateUrl: './tabela-home.component.html',
  styleUrls: ['./tabela-home.component.scss'],
})
export class TabelaHomeComponent implements OnInit {

  @Input() dataList: TabelaHome[] = [];

  constructor() { }

  ngOnInit() {}

  public ordenaPorNumero(): void {
    this.dataList = this.dataList.sort((a, b) => a.linha.numero > b.linha.numero ? 1 : (b.linha.numero > a.linha.numero ? -1 : 0));
  }

  public ordenaPorNome(): void {
    this.dataList = this.dataList.sort((a, b) => a.linha.nome > b.linha.nome ? 1 : (b.linha.nome > a.linha.nome ? -1 : 0));
  }
}
