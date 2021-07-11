import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinhasPageRoutingModule } from './linhas-routing.module';

import { LinhasPage } from './linhas.page';
import { PesquisaModule } from '../pesquisa/pesquisa.module';
import { TabelaResultadoModule } from '../tabela-resultado/tabela-resultado.module';
import { SharedModule } from '../shared/shared.module';
import { CadastrarLinhaComponent } from './components/cadastrar-linha/cadastrar-linha.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinhasPageRoutingModule,
    SharedModule,
    PesquisaModule,
    TabelaResultadoModule
  ],
  declarations: [LinhasPage, CadastrarLinhaComponent]
})
export class LinhasPageModule {}
