import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Horario } from '../../models/horarios.model';

@Component({
  selector: 'app-descricao-horarios',
  templateUrl: './descricao-horarios.component.html',
  styleUrls: ['./descricao-horarios.component.scss'],
})
export class DescricaoHorariosComponent implements OnInit {

  @Input() horarioSelecionado: Horario;

  horariosDiaUtil: string[] = [];
  horariosSabado: string[] = [];
  horariosDomingoEFeriados: string[] = [];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.montaDiasUteis();
    this.montaSabados();
    this.montaDomingosEFeriados();
  }

  private montaDiasUteis() {
    const intervalo: number = this.horarioSelecionado.intervaloDiaUtil;
    const horaInicioCompleta: string[] = this.horarioSelecionado.inicioDiaUtil.split(':');
    const horaFimCompleta: string[] = this.horarioSelecionado.fimDiaUtil.split(':');

    const horaInicioEmMin: number = this.converteHorasEmMinutos(+horaInicioCompleta[0], +horaInicioCompleta[1]);
    const horaFimEmMin: number = this.converteHorasEmMinutos(+horaFimCompleta[0], +horaFimCompleta[1]);

    this.horariosDiaUtil.push(this.horarioSelecionado.inicioDiaUtil);
    for(let i = horaInicioEmMin + intervalo; i < horaFimEmMin; i += intervalo) {
      this.horariosDiaUtil.push(this.converteMinutosEmHoras(i));
    }
    this.horariosDiaUtil.push(this.horarioSelecionado.fimDiaUtil);
  }

  private montaSabados() {
    const intervalo: number = this.horarioSelecionado.intervaloSabado;
    const horaInicioCompleta: string[] = this.horarioSelecionado.inicioSabado.split(':');
    const horaFimCompleta: string[] = this.horarioSelecionado.fimSabado.split(':');

    const horaInicioEmMin: number = this.converteHorasEmMinutos(+horaInicioCompleta[0], +horaInicioCompleta[1]);
    const horaFimEmMin: number = this.converteHorasEmMinutos(+horaFimCompleta[0], +horaFimCompleta[1]);

    this.horariosSabado.push(this.horarioSelecionado.inicioSabado);
    for(let i = horaInicioEmMin + intervalo; i < horaFimEmMin; i += intervalo) {
      this.horariosSabado.push(this.converteMinutosEmHoras(i));
    }
    this.horariosSabado.push(this.horarioSelecionado.fimSabado);
  }

  private montaDomingosEFeriados() {
    const intervalo: number = this.horarioSelecionado.intervaloDomingoEFeriado;
    const horaInicioCompleta: string[] = this.horarioSelecionado.inicioDomingoEFeriado.split(':');
    const horaFimCompleta: string[] = this.horarioSelecionado.fimDomingoEFeriado.split(':');

    const horaInicioEmMin: number = this.converteHorasEmMinutos(+horaInicioCompleta[0], +horaInicioCompleta[1]);
    const horaFimEmMin: number = this.converteHorasEmMinutos(+horaFimCompleta[0], +horaFimCompleta[1]);

    this.horariosDomingoEFeriados.push(this.horarioSelecionado.inicioDomingoEFeriado);
    for(let i = horaInicioEmMin + intervalo; i < horaFimEmMin; i += intervalo) {
      this.horariosDomingoEFeriados.push(this.converteMinutosEmHoras(i));
    }
    this.horariosDomingoEFeriados.push(this.horarioSelecionado.fimDomingoEFeriado);
  }

  private converteMinutosEmHoras(minutos: number): string {
    const resto: number = minutos % 60;
    const resultado: number = (minutos - resto) / 60;
    return `${resultado < 10 ? '0' + resultado : resultado}:${resto < 10 ? '0' + resto : resto}`; //HH:mm
  }

  private converteHorasEmMinutos(horaInicio: number, minutoInicio: number) {
    return (horaInicio * 60) + minutoInicio;
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }
}
