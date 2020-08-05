import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistraPComponent } from './components/registra-categoria/registra-p/registra-p.component';
import { RegistraPlatilloComponent } from './components/registra-platillo/registra-platillo.component';


const routes: Routes = [
  {path: 'refistraP', component: RegistraPComponent,data:{titulo:'registra'}},
  {path: 'platillosP', component: RegistraPlatilloComponent,data:{titulo:'platillo'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
