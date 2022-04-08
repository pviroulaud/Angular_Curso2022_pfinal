import { Injectable } from '@angular/core';
import { Alumno } from '../clases/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  listaAl: Alumno[]=[];
  
  constructor() {
    this.listaAl=[
      new Alumno(1,"Alumno1","Apellido",new Date("11/17/1983",),0,"correo1@mail.com",123456,"1","direccion1"),
      new Alumno(2,"Alumno2","Apellido2",new Date("01/01/2020"),0,"correo2@mail.com",456789,"0","direccion2"),
      new Alumno(3,"Alumno3","Apellido3",new Date("01/01/2010"),0,"correo3@mail.com",123456,"2","direccion3"),
      new Alumno(4,"Alumno4","Apellido4",new Date("01/01/2007"),0,"correo4@mail.com",456789,"2","direccion4"),
      new Alumno(5,"Alumno5","Apellido5",new Date("01/01/2009"),0,"correo5@mail.com",789123,"1","direccion5"),
    ];
   }

  getAlumnos() { 
    return this.listaAl;
  }

  addAlumno(al:Alumno) {
    al.id=this.obtenerSiguienteId()+1;

    this.listaAl.push(al);
  }
  deleteAlumno(al:Alumno){
    this.listaAl.splice(this.listaAl.findIndex(x=>x.id==al.id),1);
  }
  updateAlumno(al:Alumno){
    this.listaAl[this.listaAl.findIndex(x=>x.id==al.id)]=al;
  }

  obtenerSiguienteId():number{
    let max=0;
    for(let i=0;i<this.listaAl.length;i++){
      if (this.listaAl[i].id>max)
        max=this.listaAl[i].id;
    }
    return max;
  }
}
