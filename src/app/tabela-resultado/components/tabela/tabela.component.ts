import { Component, Input, OnInit } from '@angular/core';
import { ModalOptions } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { ResultadoItinerario } from 'src/app/pesquisa/models/pesquisa.model';
import { PesquisaHorariosComponent } from 'src/app/pesquisa/components/pesquisa-horarios/pesquisa-horarios.component';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class TabelaComponent implements OnInit {

  @Input() resultadoBusca: ResultadoItinerario[] = [];

  modal: HTMLIonModalElement;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  public abrirModal(i: number) {
    const resultado = this.resultadoBusca[i];
    this.chamarModal({
      component: PesquisaHorariosComponent,
      componentProps: {
        resultado
      } 
    });
  }

  private async chamarModal(options: ModalOptions) {
    this.modal = await this.modalController.create({
      cssClass: 'action-bar-modal',
      backdropDismiss: true,
      ...options
    });
    await this.modal.present();
  }
}
