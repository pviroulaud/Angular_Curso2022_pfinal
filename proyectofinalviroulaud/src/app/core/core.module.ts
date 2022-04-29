import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app.material.module';
import { AppRoutingModule } from './app-routing.module';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { BarraTituloComponent } from './componentes/barra-titulo/barra-titulo.component';
import { ModalConfirmacionComponent } from './componentes/modal-confirmacion/modal-confirmacion.component';
import { CursosModule } from '../features/cursos/cursos.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosModule } from '../features/usuarios/usuarios.module';



@NgModule({
  declarations: [
    /* Declaracion de componentes */
    PaginaNoEncontradaComponent,
    InicioComponent,
    LoginComponent,
    MenuComponent,
    BarraTituloComponent,
    ModalConfirmacionComponent
  ],
  imports: [
    /* Modulos que se importan para su utilizacion */
    CommonModule,
    AppMaterialModule,
    CursosModule,
    UsuariosModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    /* Modulos que se exportan para disponibilizarlos en el resto de la aplicación */
    AppMaterialModule,
    AppRoutingModule,
    LoginComponent,
    InicioComponent,
    CursosModule,
    UsuariosModule,
  ]
})
export class CoreModule {

 }
