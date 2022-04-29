import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Curso } from 'src/app/core/clases/curso';
import { Usuario } from 'src/app/core/clases/usuario';
import { ModalConfirmacionComponent } from 'src/app/core/componentes/modal-confirmacion/modal-confirmacion.component';
import { UsuarioService } from 'src/app/core/servicios/usuario.service';

@Component({
  selector: 'app-abm-curso',
  templateUrl: './abm-curso.component.html',
  styleUrls: ['./abm-curso.component.css']
})
export class AbmCursoComponent implements OnInit {

  curso:Curso=new Curso(0,"","",0,0,0,new Date(),0);
  titulo:string="Editar";
  edita:boolean=true;
  profesores:Usuario[]=[];
  listaAlumnosCurso:Usuario[]=[];
  soloLectura:boolean=false;  

  constructor(public dialog:MatDialog,
              public refDialog: MatDialogRef<AbmCursoComponent>, 
              private servicioUsuario:UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data:{datosCurso:Curso,profesores:Usuario[],listaAlumnos:Usuario[],soloLectura:boolean}) 
    {
      console.log(data.profesores);
      this.profesores= data.profesores;
      this.listaAlumnosCurso= data.listaAlumnos;
      this.soloLectura=data.soloLectura;
      if (data.datosCurso.id==0)
      {
        this.titulo="Nuevo";
        this.edita=false;
      }
      else{
        this.titulo="Editar";
        this.edita=true;
      }
        this.curso=data.datosCurso;
        console.log("alumnos del curso",this.listaAlumnosCurso);
    }

  frm:FormGroup=new FormGroup({
    id:new FormControl(''),
    nombre: new FormControl('',[Validators.required,Validators.minLength(1)]),
    descripcion: new FormControl('',[Validators.required,Validators.minLength(3)]),
    fechaInicio: new FormControl(new Date(),Validators.required),
    fechaFin: new FormControl(new Date(),Validators.required),
    cupo: new FormControl(0,Validators.required),
    clasesSemanales: new FormControl(0,Validators.required),
    totalClases: new FormControl(0,Validators.required),
    profesor: new FormControl(0,Validators.required)
  });

  ngOnInit(): void {
  }

  quitarAlumno(alumno:Usuario,curso:Curso){
    const refDialog=this.dialog.open(ModalConfirmacionComponent,{data:{titulo:"Eliminar Inscripción",subTitulo:"Esta accion tendra efecto inmediato ¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        let id:number=alumno.id;
        this.servicioUsuario.desasignarCurso(alumno,curso);
        this.servicioUsuario.updateUsuario(alumno)?.subscribe(()=>{
          this.listaAlumnosCurso.splice(this.listaAlumnosCurso.findIndex(x=>x.id==id),1);
        });
      }
    });
    

    return false;
  }

  aplicar()
  {
    if (this.frm.valid)
    {
      this.refDialog.close(this.curso);
    }
  }
}
