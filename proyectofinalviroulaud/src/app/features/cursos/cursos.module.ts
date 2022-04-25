import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCursosComponent } from './componentes/lista-cursos/lista-cursos.component';
import { AbmCursoComponent } from './componentes/abm-curso/abm-curso.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { AppMaterialModule } from '../../core/app.material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CursosRoutingModule } from './cursos-routing.module';





@NgModule({
  declarations: [
    ListaCursosComponent,
    AbmCursoComponent,

  ],
  imports: [
    
    CommonModule,
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule,
    CursosRoutingModule
  ],
  exports: [
  ]
})
export class CursosModule {
  
}
