import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItinerariosPageRoutingModule } from './itinerarios-routing.module';

import { ItinerariosPage } from './itinerarios.page';
import { SharedModule } from '../shared/shared.module';
import { PesquisaModule } from '../pesquisa/pesquisa.module';
import { TabelaResultadoModule } from '../tabela-resultado/tabela-resultado.module';
import { CadastrarItinerarioComponent } from './components/cadastrar-itinerario/cadastrar-itinerario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItinerariosPageRoutingModule,
    SharedModule,
    PesquisaModule,
    TabelaResultadoModule
  ],
  declarations: [ItinerariosPage, CadastrarItinerarioComponent]
})
export class ItinerariosPageModule {}
