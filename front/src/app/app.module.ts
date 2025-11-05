// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SedeComponent } from './sede/sede.component';
import { AreaComponent } from './area/area.component';
import { CarpetaComponent } from './carpeta/carpeta.component';
import { FormatoComponent } from './formato/formato.component';

import { AppRoutingModule } from './app-routing.module';
import {  PanelNavegacionComponent } from './panel-navegacion/panel-navegacion.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterSedePipe } from './pipes/filter-sede.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SedeComponent,
    AreaComponent,
    CarpetaComponent,
    FormatoComponent,
    PanelNavegacionComponent,
    FilterSedePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
