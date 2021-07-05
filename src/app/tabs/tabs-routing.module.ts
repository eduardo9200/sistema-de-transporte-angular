import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'linhas',
        loadChildren: () => import('../linhas/linhas.module').then(m => m.LinhasPageModule)
      },
      {
        path: 'itinerarios',
        loadChildren: () => import('../itinerarios/itinerarios.module').then(m => m.ItinerariosPageModule)
      },
      {
        path: 'horarios',
        loadChildren: () => import('../horarios/horarios.module').then(m => m.HorariosPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
