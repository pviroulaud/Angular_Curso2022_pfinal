import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../clases/alumno';
import { AbmAlumnoComponent } from '../abm-alumno/abm-alumno.component';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css','../../app.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  nombreColumnas:string[]=["id","nombre","dni","email","telefono","editar"];
  listaAl: Alumno[]=[];

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
    this.obtenerAlumnos();
  }


  
  obtenerAlumnos(){
    this.listaAl=[
      new Alumno(1,"Alumno1","Apellido",new Date("11/17/1983",),0,"correo1@mail.com",123456,"1","direccion1"),
      new Alumno(2,"Alumno2","Apellido2",new Date("01/01/2020"),0,"correo2@mail.com",456789,"0","direccion2"),
      new Alumno(3,"Alumno3","Apellido3",new Date("01/01/2010"),0,"correo3@mail.com",123456,"2","direccion3"),
      new Alumno(4,"Alumno4","Apellido4",new Date("01/01/2007"),0,"correo4@mail.com",456789,"2","direccion4"),
      new Alumno(5,"Alumno5","Apellido5",new Date("01/01/2009"),0,"correo5@mail.com",789123,"1","direccion5"),
  
  
    ];
  }


  editarAlumno(al:Alumno){
    this.dialog.open(AbmAlumnoComponent,{data:al});

  }
  altaAlumno()
  {
    this.dialog.open(AbmAlumnoComponent,{data:new Alumno(0,"","",new Date(),0,"",0,"","")});

  }
  eliminarAlumno(al:Alumno){
    console.log(this.listaAl)
    this.listaAl.splice(this.listaAl.indexOf(al),1);
    console.log(this.listaAl)
  }
}
