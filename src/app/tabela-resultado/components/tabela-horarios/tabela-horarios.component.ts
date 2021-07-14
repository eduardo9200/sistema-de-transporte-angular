import { EventEmitter } from '@angular/core';
import { ModalOptions } from '@ionic/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Horario } from 'src/app/horarios/models/horarios.model';
import { ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { CadastrarHorarioComponent } from 'src/app/horarios/components/cadastrar-horario/cadastrar-horario.component';
import Swal from 'sweetalert2';
import { DescricaoHorariosComponent } from 'src/app/horarios/components/descricao-horarios/descricao-horarios.component';

@Component({
  selector: 'app-tabela-horarios',
  templateUrl: './tabela-horarios.component.html',
  styleUrls: ['./tabela-horarios.component.scss'],
})
export class TabelaHorariosComponent implements OnInit {

  @Input() horarios: Horario[] = [];
  @Output() deletarHorario = new EventEmitter<Horario>();

  modal: HTMLIonModalElement;

  constructor(
    private modalController: ModalController,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {}

  public async abrirModal(i: number) {
    const loading = await this.overlayService.loading();
    const horarioCadastrado: Horario = this.horarios[i];
    this.chamarModal({
      component: CadastrarHorarioComponent,
      componentProps: {
        horarioCadastrado,
        openedFromTabela: true
      } 
    });
    loading.dismiss();
  }

  public async abrirModalHorarios(i: number) {
    const loading = await this.overlayService.loading();
    const horarioSelecionado: Horario = this.horarios[i];
    this.chamarModal({
      component: DescricaoHorariosComponent,
      componentProps: {
        horarioSelecionado
      }
    });
    loading.dismiss();
  }

  public ordenaPorNumero(): void {
    this.horarios = this.horarios.sort((a, b) => a.linha.numero > b.linha.numero ? 1 : (b.linha.numero > a.linha.numero ? -1 : 0));
  }

  public ordenaPorNome(): void {
    this.horarios = this.horarios.sort((a, b) => a.linha.nome > b.linha.nome ? 1 : (b.linha.nome > a.linha.nome ? -1 : 0));
  }

  public async delete(i: number) {
    Swal.fire({
      title: 'Deletar Horários da Linha?',
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
        this.deletarHorario.emit(this.horarios[i]);
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
