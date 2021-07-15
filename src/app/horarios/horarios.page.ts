import { Component, OnInit } from '@angular/core';
import { ModalOptions } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { OverlayService } from '../core/services/overlay.service';
import { Linha } from '../linhas/models/linhas.model';
import { PesquisaBuilder } from '../pesquisa/services/pesquisa.builder';
import { Horario } from './models/horarios.model';
import { HorarioService } from './services/horario.service';
import { CadastrarHorarioComponent } from './components/cadastrar-horario/cadastrar-horario.component';
import { DadosBuscaLinha, TipoItemBuscaLinha } from '../pesquisa/models/pesquisa.model';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  horarios: Horario[];
  isMostrarResultado: boolean = false;
  modal: HTMLIonModalElement;
  linhas: Linha[];

  constructor(
    private modalController: ModalController,
    private overlayService: OverlayService,
    private pesquisaBuilder: PesquisaBuilder,
    private horarioService: HorarioService
  ) { }

  ngOnInit() {}

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

    this.horarioService
    .buscarHorario(event)
    .subscribe(resultadoList => {
      this.horarios = resultadoList;
      this.isMostrarResultado = true;
      loading.dismiss();
    }, error => {
      this.overlayService.toast({ message: `Ops! Falha na busca de um horário.` });
      loading.dismiss();
    });
  }

  public async deletarHorario(event: Horario) {
    const loading = await this.overlayService.loading();

    this.horarioService.deleteHorario(event)
    .subscribe(() => {
      this.overlayService.toast({ message: `Horário deletado com sucesso.` });
      this.removeElementoDoArray(this.horarios, event);
      loading.dismiss();
    }, error => {
      this.overlayService.toast({ message: `Ops! Falha ao deletar horário.` });
      loading.dismiss();
    });
  }

  private removeElementoDoArray(horarios: Horario[], horario: Horario): void {
    const index = horarios.indexOf(horario);
    if(index > -1) {
      horarios.splice(index, 1);
    }
  }

  public async chamarModalNovoHorario() {
    const loading = await this.overlayService.loading();
    this.chamarModal({
      component: CadastrarHorarioComponent,
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
