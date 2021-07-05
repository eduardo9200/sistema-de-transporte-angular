import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaItinerarioComponent } from './components/pesquisa-itinerario/pesquisa-itinerario.component';
import { PesquisaHorariosComponent } from './components/pesquisa-horarios/pesquisa-horarios.component';



@NgModule({
  declarations: [
    PesquisaItinerarioComponent, PesquisaHorariosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PesquisaItinerarioComponent, PesquisaHorariosComponent
  ]
})
export class PesquisaModule { }
