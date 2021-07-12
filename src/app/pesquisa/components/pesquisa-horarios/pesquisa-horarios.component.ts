import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { DadosBuscaLinha } from '../../models/pesquisa.model';

@Component({
  selector: 'app-pesquisa-horarios',
  templateUrl: './pesquisa-horarios.component.html',
  styleUrls: ['./pesquisa-horarios.component.scss'],
})
export class PesquisaHorariosComponent implements OnInit {

  @Output() dadosBusca = new EventEmitter<DadosBuscaLinha>();

  constructor() { }

  ngOnInit() {}

}
