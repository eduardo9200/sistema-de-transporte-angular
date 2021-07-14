import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorariosPageRoutingModule } from './horarios-routing.module';

import { HorariosPage } from './horarios.page';
import { CadastrarHorarioComponent } from './components/cadastrar-horario/cadastrar-horario.component';
import { SharedModule } from '../shared/shared.module';
import { PesquisaModule } from '../pesquisa/pesquisa.module';
import { TabelaResultadoModule } from '../tabela-resultado/tabela-resultado.module';
import { DescricaoHorariosComponent } from './components/descricao-horarios/descricao-horarios.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorariosPageRoutingModule,
    SharedModule,
    PesquisaModule,
    TabelaResultadoModule
  ],
  declarations: [HorariosPage, CadastrarHorarioComponent, DescricaoHorariosComponent]
})
export class HorariosPageModule {}
