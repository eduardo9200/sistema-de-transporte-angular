import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinhasPageRoutingModule } from './linhas-routing.module';

import { LinhasPage } from './linhas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinhasPageRoutingModule
  ],
  declarations: [LinhasPage]
})
export class LinhasPageModule {}
