import { Component, OnInit } from '@angular/core';
import { ModalOptions } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { DadosBusca, ResultadoItinerario } from '../pesquisa/models/pesquisa.model';
import { ItinerarioService } from './services/itinerario.service';
import { PesquisaLinhasService } from '../pesquisa/services/pesquisa-linhas.service';
import { CadastrarItinerarioComponent } from './components/cadastrar-itinerario/cadastrar-itinerario.component';
import { Linha } from '../linhas/models/linhas.model';

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
    private pesquisaLinhasService: PesquisaLinhasService
  ) { }

  ngOnInit() {
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

  public chamarModalNovoItinerario() {
    console.log('chamando modal');
    this.chamarModal({
      component: CadastrarItinerarioComponent,
      componentProps: {
        linhas: this.linhas
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
