import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Horario } from 'src/app/horarios/models/horarios.model';

@Component({
  selector: 'app-tabela-horarios',
  templateUrl: './tabela-horarios.component.html',
  styleUrls: ['./tabela-horarios.component.scss'],
})
export class TabelaHorariosComponent implements OnInit {

  @Input() horarios: Horario[] = [];
  @Output() deletarHorario = new EventEmitter<Horario>();

  constructor() { }

  ngOnInit() {}

}
