import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "src/app/core/componentes/inicio/inicio.component";
import { ListaCursosComponent } from "./componentes/lista-cursos/lista-cursos.component";


const routes: Routes = [
    {path: '', component: InicioComponent, children: [
        {path: 'cursos', component: ListaCursosComponent}
      ]}
    
];

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class CursosRoutingModule{}