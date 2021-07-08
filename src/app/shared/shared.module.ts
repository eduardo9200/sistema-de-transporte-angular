import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ModalHeaderComponent,
    ModalFooterComponent
  ],
  imports: [
    CommonModule, FormsModule, IonicModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ModalHeaderComponent,
    ModalFooterComponent
  ]
})
export class SharedModule { }
