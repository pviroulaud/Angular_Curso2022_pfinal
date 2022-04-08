import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../clases/alumno';
import { AbmAlumnoComponent } from '../abm-alumno/abm-alumno.component';
import { ModalConfirmacionComponent} from '../modal-confirmacion/modal-confirmacion.component';
import { MatTable} from '@angular/material/table'

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css','../../app.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>; // este viewchild es para el refresh de la tabla
  
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
    const refDialog=this.dialog.open(AbmAlumnoComponent,{data:new Alumno(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion)});

    refDialog.afterClosed().subscribe(result => {
      this.listaAl[this.listaAl.findIndex(x=>x.id==result.id)]=result;

      this.table.renderRows();
    });    
  }
  altaAlumno()
  {
    const refDialog=this.dialog.open(AbmAlumnoComponent,{data:new Alumno(0,"","",new Date(),0,"",0,"","")});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
        result.id=this.obtenerSiguienteId()+1;

        this.listaAl.push(result);
        this.table.renderRows();
      }
      
    });

  }
  eliminarAlumno(al:Alumno){

    const refDialog=this.dialog.open(ModalConfirmacionComponent,{data:{titulo:"Eliminar Alumno",subTitulo:"¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        this.listaAl.splice(this.listaAl.findIndex(x=>x.id==al.id),1);
        this.table.renderRows();// refresh de la tabla    
      }
    });
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
