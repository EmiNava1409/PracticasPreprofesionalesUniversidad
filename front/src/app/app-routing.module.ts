import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelNavegacionComponent } from './panel-navegacion/panel-navegacion.component';
import { SedeComponent } from './sede/sede.component';
import { AreaComponent } from './area/area.component';
import { CarpetaComponent } from './carpeta/carpeta.component';
import { FormatoComponent } from './formato/formato.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },                   // libre
  { path: '',        component: PanelNavegacionComponent, canActivate: [AuthGuard] },
  { path: 'sede',    component: SedeComponent, canActivate: [AuthGuard] },
  { path: 'area',    component: AreaComponent, canActivate: [AuthGuard] },
  { path: 'carpeta', component: CarpetaComponent, canActivate: [AuthGuard] },
  { path: 'formato', component: FormatoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
