import { Component, OnInit } from '@angular/core';
import { ModalOptions } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { DadosBusca, ResultadoItinerario } from '../pesquisa/models/pesquisa.model';
import { PesquisaItinerarioService } from '../pesquisa/services/pesquisa-itinerario.service';
import { PesquisaLinhasService } from '../pesquisa/services/pesquisa-linhas.service';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.page.html',
  styleUrls: ['./itinerarios.page.scss'],
})
export class ItinerariosPage implements OnInit {

  resultadoBusca: ResultadoItinerario[];
  isMostrarResultado: boolean = false;
  modal: HTMLIonModalElement;

  constructor(
    private pesquisaItinerarioService: PesquisaItinerarioService,
    private modalController: ModalController,
    private pesquisaLinhaService: PesquisaLinhasService
  ) { }

  ngOnInit() {
  }

  public buscar(event: DadosBusca) {
    this.isMostrarResultado = true;
    /*this.pesquisaItinerarioService
    .buscaItinerario(event)
    .subscribe(resultadoList => {
      this.resultadoBusca = resultadoList;
    });*/
    this.resultadoBusca = [
      {
        numeroLinha: 123
      },
      {
        numeroLinha: 321
      },
      {
        numeroLinha: 456
      }
    ];
  }

  public chamarModalNovoItinerario() {
    console.log('chamando modal');
    /*this.chamarModal({
      component: x,
      componentProps: {
        linhas
      }
    });*/
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
