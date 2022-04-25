import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbmUsuarioComponent } from './componentes/abm-usuario/abm-usuario.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppMaterialModule } from '../../core/app.material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaAlumnosComponent } from './componentes/lista-alumnos/lista-alumnos.component';



@NgModule({
  declarations: [
    AbmUsuarioComponent,
    ListaUsuariosComponent,
    ListaAlumnosComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
