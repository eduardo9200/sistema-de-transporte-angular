import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';



@NgModule({
  declarations: [
    ModalHeaderComponent,
    ModalFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalHeaderComponent,
    ModalFooterComponent
  ]
})
export class SharedModule { }
