import { Component, Input, OnInit } from '@angular/core';
import { ModalOptions } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { TabelaHome } from 'src/app/home/models/home.model';
import { DescricaoHorariosComponent } from 'src/app/horarios/components/descricao-horarios/descricao-horarios.component';
import { Horario } from 'src/app/horarios/models/horarios.model';

@Component({
  selector: 'app-tabela-home',
  templateUrl: './tabela-home.component.html',
  styleUrls: ['./tabela-home.component.scss'],
})
export class TabelaHomeComponent implements OnInit {

  @Input() dataList: TabelaHome[] = [];

  modal: HTMLIonModalElement;

  constructor(
    private modalController: ModalController,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {}

  public ordenaPorNumero(): void {
    this.dataList = this.dataList.sort((a, b) => a.linha.numero > b.linha.numero ? 1 : (b.linha.numero > a.linha.numero ? -1 : 0));
  }

  public ordenaPorNome(): void {
    this.dataList = this.dataList.sort((a, b) => a.linha.nome > b.linha.nome ? 1 : (b.linha.nome > a.linha.nome ? -1 : 0));
  }

  public async abrirModalHorarios(i: number) {
    const loading = await this.overlayService.loading();
    const horarioSelecionado: Horario = this.dataList[i].horario;
    this.chamarModal({
      component: DescricaoHorariosComponent,
      componentProps: {
        horarioSelecionado
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
