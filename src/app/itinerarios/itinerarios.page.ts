import { Component, OnInit } from '@angular/core';
import { ModalOptions } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { DadosBusca, TipoItemBusca } from '../pesquisa/models/pesquisa.model';
import { ItinerarioService } from './services/itinerario.service';
import { CadastrarItinerarioComponent } from './components/cadastrar-itinerario/cadastrar-itinerario.component';
import { Linha } from '../linhas/models/linhas.model';
import { OverlayService } from '../core/services/overlay.service';
import { PesquisaBuilder } from '../pesquisa/services/pesquisa.builder';
import { Itinerario } from './models/itinerario.model';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.page.html',
  styleUrls: ['./itinerarios.page.scss'],
})
export class ItinerariosPage implements OnInit {

  itinerarios: Itinerario[];
  isMostrarResultado: boolean = false;
  modal: HTMLIonModalElement;
  linhas: Linha[];

  constructor(
    private itinerarioService: ItinerarioService,
    private modalController: ModalController,
    private overlayService: OverlayService,
    private pesquisaBuilder: PesquisaBuilder
  ) { }

  ngOnInit() {}

  public async buscar(event: DadosBusca) {
    const loading = await this.overlayService.loading();

    if(event.itemSelecionado == undefined && event.textoBusca == null) {
      event = this.pesquisaBuilder.getDadosBuscaTodos();
    }

    if(event.itemSelecionado.id !== TipoItemBusca.TODOS && event.textoBusca === null) {
      loading.dismiss();
      this.overlayService.toast({ message: 'Digite um texto no campo de pesquisa.' });
      return;
    }

    this.itinerarioService
    .buscaItinerario(event)
    .subscribe(resultadoList => {
      this.itinerarios = resultadoList;
      this.isMostrarResultado = true;
      loading.dismiss();
    }, error => {
      this.overlayService.toast({ message: `Ops! Falha na busca de um itinerário.` });
      loading.dismiss();
    });
  }

  public async deletarItinerario(event: Itinerario) {
    const loading = await this.overlayService.loading();

    this.itinerarioService.deleteItinerario(event)
    .subscribe(() => {
      this.overlayService.toast({ message: `Itinerário deletado com sucesso.` });
      this.removeElementoDoArray(this.itinerarios, event);
      loading.dismiss();
    }, error => {
      this.overlayService.toast({ message: `Ops! Falha ao deletar itinerário.` });
      loading.dismiss();
    });
  }

  private removeElementoDoArray(itinerarios: Itinerario[], itinerario: Itinerario): void {
    const index = itinerarios.indexOf(itinerario);
    if(index > -1) {
      itinerarios.splice(index, 1);
    }
  }

  public async chamarModalNovoItinerario() {
    const loading = await this.overlayService.loading();
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
