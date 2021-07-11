import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from './components/tabela/tabela.component';
import { SharedModule } from '../shared/shared.module';
import { TabelaLinhasComponent } from './components/tabela-linhas/tabela-linhas.component';



@NgModule({
  declarations: [
    TabelaComponent,
    TabelaLinhasComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TabelaComponent,
    TabelaLinhasComponent
  ]
})
export class TabelaResultadoModule { }
