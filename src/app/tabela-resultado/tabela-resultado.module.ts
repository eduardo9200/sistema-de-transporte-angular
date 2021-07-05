import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from './components/tabela/tabela.component';



@NgModule({
  declarations: [
    TabelaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabelaComponent
  ]
})
export class TabelaResultadoModule { }
