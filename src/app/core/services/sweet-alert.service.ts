import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  sucesso(titulo: string, mensagem: string): any {
    return Swal.fire({
      title: titulo,
      text: mensagem,
      icon: 'success',
      confirmButtonColor: '#08309c',
      heightAuto: false,
      allowOutsideClick: false,
      backdrop: false,
      customClass: {
        title: 'font-titulo-sweet-alert',
        confirmButton: 'font-titulo-sweet-alert button-confirm-sweet-alert',
        container: 'container--sweet-alert'
      }
    });
  }

  error(titulo: string, messagem: string) {
    return Swal.fire({
      title: titulo,
      text: messagem,
      icon: 'error',
      confirmButtonColor: '#08309c',
      heightAuto: false,
      allowOutsideClick: false,
      backdrop: false,
      customClass: {
        title: 'font-titulo-sweet-alert',
        confirmButton: 'font-titulo-sweet-alert button-confirm-sweet-alert',
        container: 'container--sweet-alert'
      }
    });
  }

  info(titulo: string, messagem: string) {
     Swal.fire({
      title: titulo,
      html: messagem,
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
        return true;
      } else {
        return false;
      }
    });
  }
}

