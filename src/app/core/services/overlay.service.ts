import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
  PopoverController
} from '@ionic/angular';
import { AlertOptions, LoadingOptions, ToastOptions, ToastButton, PopoverOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private popoverController: PopoverController
  ) {}

  async alert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
    return alert;
  }

  async loading(options?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: 'Processando...',
      mode: 'ios',
      cssClass: 'loading-default',
      ...options
    });
    await loading.present();
    return loading;
  }

  async toast(options?: ToastOptions): Promise<HTMLIonToastElement> {
    const toastButton: ToastButton = { text: 'OK', side: 'end' }
    const toast = await this.toastCtrl.create({
      position: 'bottom',
      duration: 5000,
      buttons: [toastButton],
      ...options
    });
    await toast.present();
    return toast;
  }

  async showPopover(options?: PopoverOptions): Promise<HTMLIonPopoverElement> {
    const popover = await this.popoverController.create({
      translucent: true,
      ...options
    });
    await popover.present();
    return popover;
  }
}
