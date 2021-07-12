import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaItinerariosComponent } from './components/tabela-itinerarios/tabela-itinerarios.component';
import { SharedModule } from '../shared/shared.module';
import { TabelaLinhasComponent } from './components/tabela-linhas/tabela-linhas.component';
import { TabelaHorariosComponent } from './components/tabela-horarios/tabela-horarios.component';



@NgModule({
  declarations: [
    TabelaItinerariosComponent,
    TabelaLinhasComponent,
    TabelaHorariosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TabelaItinerariosComponent,
    TabelaLinhasComponent,
    TabelaHorariosComponent
  ]
})
export class TabelaResultadoModule { }
