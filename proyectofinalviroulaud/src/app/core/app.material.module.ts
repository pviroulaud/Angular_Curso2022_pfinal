import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTable } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';

//export { MatTableModule, MatTable } from '@angular/material/table';

@NgModule({
    imports: [
        /* Modulos que se importan para su utilizacion */
        CommonModule
    ],
    exports: [
        /* Modulos que se exportan para disponibilizarlos en el resto de la aplicación */
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatListModule,
        MatPaginatorModule
    ]
})
export class AppMaterialModule{
    
}