import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApellidonombrePipe } from './pipes/apellidonombre.pipe';
import { EdadPipe } from './pipes/edad.pipe';
import { TitulosDirective } from './directivas/titulos.directive';


@NgModule({
  declarations: [
    ApellidonombrePipe,
    EdadPipe,
    TitulosDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ApellidonombrePipe,
    EdadPipe,
    TitulosDirective
  ]
})
export class SharedModule {
  
 }
