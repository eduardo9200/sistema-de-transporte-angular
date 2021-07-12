import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RemoveUnderlinePipe } from './pipes/remove-underline.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ModalHeaderComponent,
    ModalFooterComponent,
    RemoveUnderlinePipe
  ],
  imports: [
    CommonModule, FormsModule, IonicModule, MatTooltipModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    RemoveUnderlinePipe,
    MatTooltipModule
  ]
})
export class SharedModule { }
