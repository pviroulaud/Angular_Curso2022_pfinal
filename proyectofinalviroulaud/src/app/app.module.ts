import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { MenuComponent } from './componentes/menu/menu.component';
import { TituloComponent } from './componentes/titulo/titulo.component';
import { ListaAlumnosComponent } from './componentes/lista-alumnos/lista-alumnos.component';
import { AbmAlumnoComponent } from './componentes/abm-alumno/abm-alumno.component';

import { ReactiveFormsModule} from '@angular/forms';
import { TitulosDirective } from './directivas/titulos.directive';
import { ApellidonombrePipe } from './pipes/apellidonombre.pipe';
import { EdadPipe } from './pipes/edad.pipe';
import { ModalConfirmacionComponent } from './componentes/modal-confirmacion/modal-confirmacion.component';
import { AlumnoService } from './servicios/alumno.service';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TituloComponent,
    ListaAlumnosComponent,
    AbmAlumnoComponent,
    TitulosDirective,
    ApellidonombrePipe,
    EdadPipe,
    ModalConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  providers: [AlumnoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
