import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalOptions } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { CadastrarLinhaComponent } from 'src/app/linhas/components/cadastrar-linha/cadastrar-linha.component';
import { Linha } from 'src/app/linhas/models/linhas.model';
import Swal from 'sweetalert2';
import { QuantidadesTiposDeLinha } from 'src/app/home/models/home.model';

@Component({
  selector: 'app-tabela-linhas',
  templateUrl: './tabela-linhas.component.html',
  styleUrls: ['./tabela-linhas.component.scss'],
})
export class TabelaLinhasComponent implements OnInit {

  @Input() linhas: Linha[];
  @Input() quantidadesTiposDeLinha: QuantidadesTiposDeLinha[];
  @Output() deletarLinha = new EventEmitter<Linha>();

  bkpLinhas: Linha[] = [];

  modal: HTMLIonModalElement;

  constructor(
    private modalController: ModalController,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
    this.bkpLinhas = this.linhas;
  }

  public async abrirModal(i: number) {
    const loading = await this.overlayService.loading();
    const linhaCadastrada = this.linhas[i];
    this.chamarModal({
      component: CadastrarLinhaComponent,
      componentProps: {
        linhaCadastrada,
        openedFromTabela: true
      } 
    });
    loading.dismiss();
  }

  public filtrarPorTipo(i: number): void {
    if(i === -1)
      this.linhas = this.bkpLinhas;
    else
      this.linhas = this.bkpLinhas.filter(linha => linha.tipo === this.quantidadesTiposDeLinha[i].tipo);
    this.ordenaPorNome();
  }

  public ordenaPorNumero(): void {
    this.linhas = this.linhas.sort((a, b) => a.numero > b.numero ? 1 : (b.numero > a.numero ? -1 : 0));
  }

  public ordenaPorNome(): void {
    this.linhas = this.linhas.sort((a, b) => a.nome > b.nome ? 1 : (b.nome > a.nome ? -1 : 0));
  }

  public ordenaPorTipo(): void {
    this.linhas = this.linhas.sort((a, b) => a.tipo > b.tipo ? 1 : (b.tipo > a.tipo ? -1 : 0));
  }

  public async delete(i: number) {
    Swal.fire({
      title: 'Deletar linha?',
      html: 'Lembre-se: esta a????o n??o poder?? ser desfeita.',
      icon: 'warning',
      confirmButtonColor: '#f08e81',
      confirmButtonText: 'Sim, confirmo',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      heightAuto: false,
      allowOutsideClick: false,
      backdrop: false,
      customClass: {
        title: 'font-titulo-sweet-alert',
        icon: 'icon--sweet-alert',
        container: 'font--sweet-alert container--sweet-alert',
        confirmButton: 'font-titulo-sweet-alert button-confirm-sweet-alert',
        cancelButton: 'font-titulo-sweet-alert button-cancel-sweet-alert',
      }
    }).then((result) => {
      if (result.value) {
        this.deletarLinha.emit(this.linhas[i]);
      } else {
        return false;
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
