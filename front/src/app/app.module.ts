import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PanelNavegacionComponent } from './panel-navegacion/panel-navegacion.component';
import { SedeComponent } from './sede/sede.component';
import { AreaComponent } from './area/area.component';
import { CarpetaComponent } from './carpeta/carpeta.component';
import { FormatoComponent } from './formato/formato.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelNavegacionComponent,
    SedeComponent,
    AreaComponent,
    CarpetaComponent,
    FormatoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
