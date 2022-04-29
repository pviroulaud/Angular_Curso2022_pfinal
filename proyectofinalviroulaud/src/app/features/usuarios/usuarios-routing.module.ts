import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/core/auth.guard";
import { InicioComponent } from "src/app/core/componentes/inicio/inicio.component";
import { ListaAlumnosComponent } from "./componentes/lista-alumnos/lista-alumnos.component";
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';


const routes: Routes = [
    
    {path: '', component: InicioComponent, children: [
        {path: 'usuarios', component: ListaUsuariosComponent, canActivate:[AuthGuard]},
        {path: 'alumnos', component: ListaAlumnosComponent, canActivate:[AuthGuard]}        
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
export class UsuariosRoutingModule{}