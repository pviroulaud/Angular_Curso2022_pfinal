import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../clases/alumno';
import { AbmAlumnoComponent } from '../abm-alumno/abm-alumno.component';
import { ModalConfirmacionComponent} from '../modal-confirmacion/modal-confirmacion.component';
import { MatTable} from '@angular/material/table'
import { AlumnoService } from 'src/app/servicios/alumno.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css','../../app.component.css'],
  providers:[AlumnoService]
})
export class ListaAlumnosComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>; // este viewchild es para el refresh de la tabla
  
  nombreColumnas:string[]=["id","nombre","dni","email","telefono","editar"];
  listaAl: Alumno[]=[];

  constructor(public dialog:MatDialog, private servicioAlumno:AlumnoService) { }

  ngOnInit(): void {
    this.obtenerAlumnos();
  }


  
  obtenerAlumnos(){
    this.listaAl=this.servicioAlumno.getAlumnos();

  }


  editarAlumno(al:Alumno){
    const refDialog=this.dialog.open(AbmAlumnoComponent,{data:new Alumno(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion)});

    refDialog.afterClosed().subscribe(result => {
      this.servicioAlumno.updateAlumno(result);
      this.table.renderRows();
    });    
  }
  altaAlumno()
  {
    const refDialog=this.dialog.open(AbmAlumnoComponent,{data:new Alumno(0,"","",new Date(),0,"",0,"","")});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
        this.servicioAlumno.addAlumno(result);
        this.table.renderRows();
      }
      
    });

  }
  eliminarAlumno(al:Alumno){

    const refDialog=this.dialog.open(ModalConfirmacionComponent,{data:{titulo:"Eliminar Alumno",subTitulo:"¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        this.servicioAlumno.deleteAlumno(al);
        this.table.renderRows();// refresh de la tabla    
      }
    });
  }
}
