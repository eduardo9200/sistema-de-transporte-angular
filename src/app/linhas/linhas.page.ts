import { Component, OnInit } from '@angular/core';
import { ModalOptions } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { OverlayService } from '../core/services/overlay.service';
import { Linha } from './models/linhas.model';
import { LinhaService } from './services/linha.service';
import { DadosBuscaLinha, TipoItemBuscaLinha } from '../pesquisa/models/pesquisa.model';
import { PesquisaBuilder } from '../pesquisa/services/pesquisa.builder';
import { CadastrarLinhaComponent } from './components/cadastrar-linha/cadastrar-linha.component';
import { HomeService } from '../home/services/home.service';
import { QuantidadesTiposDeLinha } from '../home/models/home.model';

@Component({
  selector: 'app-linhas',
  templateUrl: './linhas.page.html',
  styleUrls: ['./linhas.page.scss'],
})
export class LinhasPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private overlayService: OverlayService,
    private linhaService: LinhaService,
    private pesquisaBuilder: PesquisaBuilder,
    private homeService: HomeService
  ) { }

  ngOnInit() {
  }

  isMostrarResultado: boolean = false;
  modal: HTMLIonModalElement;
  linhas: Linha[];
  quantidadesTiposDeLinha: QuantidadesTiposDeLinha[];

  public async buscar(event: DadosBuscaLinha) {
    const loading = await this.overlayService.loading();

    if(event.itemSelecionado == undefined && event.textoBusca == null) {
      event = this.pesquisaBuilder.getDadosBuscaTodasLinhas();
    }

    if(event.itemSelecionado.id !== TipoItemBuscaLinha.TODAS && event.textoBusca === null) {
      loading.dismiss();
      this.overlayService.toast({ message: 'Digite um texto no campo de pesquisa.' });
      return;
    }

    this.linhaService
    .buscarLinha(event)
    .subscribe(resultadoList => {
      this.linhas = resultadoList;
      this.isMostrarResultado = true;
      loading.dismiss();
    }, error => {
      this.overlayService.toast({ message: `Ops! Falha na busca de uma linha.` });
      loading.dismiss();
    });

    this.homeService
    .buscaQuantidadesTiposDeLinha()
    .subscribe(qtdList => this.quantidadesTiposDeLinha = qtdList);
  }

  public async deletarLinha(event: Linha) {
    const loading = await this.overlayService.loading();

    this.linhaService.deleteLinha(event)
    .subscribe(() => {
      this.overlayService.toast({ message: `Linha deletada com sucesso.` });
      this.removeElementoDoArray(this.linhas, event);
      loading.dismiss();
    }, error => {
      this.overlayService.toast({ message: `Ops! Falha ao deletar linha.` });
      loading.dismiss();
    });
  }

  private removeElementoDoArray(linhas: Linha[], linha: Linha): void {
    const index = linhas.indexOf(linha);
    if(index > -1) {
      linhas.splice(index, 1);
    }
  }

  public async chamarModalNovaLinha() {
    const loading = await this.overlayService.loading();
    this.chamarModal({
      component: CadastrarLinhaComponent,
      componentProps: {
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
