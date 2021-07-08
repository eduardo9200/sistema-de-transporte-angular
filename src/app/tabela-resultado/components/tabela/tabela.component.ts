import { Component, Input, OnInit } from '@angular/core';
import { ResultadoItinerario } from 'src/app/pesquisa/models/pesquisa.model';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class TabelaComponent implements OnInit {

  @Input() resultadoBusca: ResultadoItinerario[];

  constructor() { }

  ngOnInit() {}

}
