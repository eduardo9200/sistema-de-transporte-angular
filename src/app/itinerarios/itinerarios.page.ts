import { Component, OnInit } from '@angular/core';
import { ModalOptions } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { DadosBusca, ResultadoItinerario } from '../pesquisa/models/pesquisa.model';
import { ItinerarioService } from './services/itinerario.service';
import { CadastrarItinerarioComponent } from './components/cadastrar-itinerario/cadastrar-itinerario.component';
import { Linha } from '../linhas/models/linhas.model';
import { OverlayService } from '../core/services/overlay.service';
import { LinhaService } from '../linhas/services/linha.service';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.page.html',
  styleUrls: ['./itinerarios.page.scss'],
})
export class ItinerariosPage implements OnInit {

  resultadoBusca: ResultadoItinerario[];
  isMostrarResultado: boolean = false;
  modal: HTMLIonModalElement;
  linhas: Linha[];

  constructor(
    private itinerarioService: ItinerarioService,
    private modalController: ModalController,
    private overlayService: OverlayService,
    private linhaService: LinhaService
  ) { }

  ngOnInit() {
    this.linhaService.buscaTodasLinhas()
    .subscribe(linhas => this.linhas = linhas);
  }

  public buscar(event: DadosBusca) {
    this.isMostrarResultado = true;
    /*this.itinerarioService
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

  public async chamarModalNovoItinerario() {
    const loading = await this.overlayService.loading();
    console.log('chamando modal');
    this.chamarModal({
      component: CadastrarItinerarioComponent,
      componentProps: {
        linhas: this.linhas,
        disabled: false
      }
    });
    loading.dismiss();
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
