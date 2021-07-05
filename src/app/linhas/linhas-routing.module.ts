import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinhasPage } from './linhas.page';

const routes: Routes = [
  {
    path: '',
    component: LinhasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinhasPageRoutingModule {}
