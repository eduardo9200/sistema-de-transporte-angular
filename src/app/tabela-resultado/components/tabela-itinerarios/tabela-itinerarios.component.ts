import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalOptions } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { CadastrarItinerarioComponent } from 'src/app/itinerarios/components/cadastrar-itinerario/cadastrar-itinerario.component';
import { Itinerario } from 'src/app/itinerarios/models/itinerario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabela-itinerarios',
  templateUrl: './tabela-itinerarios.component.html',
  styleUrls: ['./tabela-itinerarios.component.scss'],
})
export class TabelaItinerariosComponent implements OnInit {

  @Input() itinerarios: Itinerario[];
  @Output() deletarItinerario = new EventEmitter<Itinerario>();

  modal: HTMLIonModalElement;

  constructor(
    private modalController: ModalController,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {}

  public async abrirModal(i: number) {
    const loading = await this.overlayService.loading();
    const itinerarioCadastrado = this.itinerarios[i];
    this.chamarModal({
      component: CadastrarItinerarioComponent,
      componentProps: {
        itinerarioCadastrado,
        openedFromTabela: true
      } 
    });
    loading.dismiss();
  }

  public ordenaPorNumero(): void {
    this.itinerarios = this.itinerarios.sort((a, b) => a.linha.numero > b.linha.numero ? 1 : (b.linha.numero > a.linha.numero ? -1 : 0));
  }

  public ordenaPorNome(): void {
    this.itinerarios = this.itinerarios.sort((a, b) => a.linha.nome > b.linha.nome ? 1 : (b.linha.nome > a.linha.nome ? -1 : 0));
  }

  public async delete(i: number) {
    Swal.fire({
      title: 'Deletar itinerário?',
      html: 'Lembre-se: esta ação não poderá ser desfeita.',
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
        this.deletarItinerario.emit(this.itinerarios[i]);
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
