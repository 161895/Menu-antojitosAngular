import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { RegistraPComponent } from './components/registra-categoria/registra-p/registra-p.component';
import { MenuComponent } from './components/registra-categoria/menu.component';
import { RegistraPlatilloComponent } from './components/registra-platillo/registra-platillo.component';
import { InsertaPComponent } from './components/registra-platillo/inserta-p/inserta-p.component';
import { EditaComponent } from './components/registra-categoria/edita/edita.component';
import { EditaPComponent } from './components/registra-platillo/edita-p/edita-p.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistraPComponent,
 
    MenuComponent,
    RegistraPlatilloComponent,
    InsertaPComponent,
    EditaComponent,
    EditaPComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
