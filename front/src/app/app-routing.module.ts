import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelNavegacionComponent } from './panel-navegacion/panel-navegacion.component';
import { SedeComponent } from './sede/sede.component';
import { AreaComponent } from './area/area.component';
import { CarpetaComponent } from './carpeta/carpeta.component';
import { FormatoComponent } from './formato/formato.component';

const routes: Routes = [
  { path: '', component: PanelNavegacionComponent, pathMatch: 'full' },   // 👈 le agrego pathMatch
  { path: 'sede', component: SedeComponent },
  { path: 'area', component: AreaComponent },
  { path: 'carpeta', component: CarpetaComponent },
  { path: 'formato', component: FormatoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
