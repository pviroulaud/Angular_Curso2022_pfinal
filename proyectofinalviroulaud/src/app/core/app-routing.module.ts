import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';
import { InicioComponent } from './componentes/inicio/inicio.component';



const routes: Routes = [
    {path: 'login', component: LoginComponent},

    
    {path: '', redirectTo: '/login', pathMatch: 'full'}
   
 
    // {path: '**', component: PaginaNoEncontradaComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
