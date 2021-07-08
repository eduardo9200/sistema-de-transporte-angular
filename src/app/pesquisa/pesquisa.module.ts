import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaItinerarioComponent } from './components/pesquisa-itinerario/pesquisa-itinerario.component';
import { PesquisaHorariosComponent } from './components/pesquisa-horarios/pesquisa-horarios.component';
import { SharedModule } from '../shared/shared.module';
import { PesquisaItinerarioService } from './services/pesquisa-itinerario.service';



@NgModule({
  declarations: [
    PesquisaItinerarioComponent, PesquisaHorariosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PesquisaItinerarioComponent, PesquisaHorariosComponent
  ],
  providers: [
    PesquisaItinerarioService
  ]
})
export class PesquisaModule { }
