import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from './components/tabela/tabela.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TabelaComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TabelaComponent
  ]
})
export class TabelaResultadoModule { }
