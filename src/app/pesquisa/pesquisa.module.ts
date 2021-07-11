import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaItinerarioComponent } from './components/pesquisa-itinerario/pesquisa-itinerario.component';
import { PesquisaHorariosComponent } from './components/pesquisa-horarios/pesquisa-horarios.component';
import { SharedModule } from '../shared/shared.module';
import { PesquisaLinhasComponent } from './components/pesquisa-linhas/pesquisa-linhas.component';

@NgModule({
  declarations: [
    PesquisaItinerarioComponent, PesquisaHorariosComponent, PesquisaLinhasComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PesquisaItinerarioComponent, PesquisaHorariosComponent, PesquisaLinhasComponent
  ],
  providers: []
})
export class PesquisaModule { }
