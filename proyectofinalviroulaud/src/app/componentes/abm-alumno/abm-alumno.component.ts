import { Component, OnInit,Inject } from '@angular/core';
import { Alumno } from '../../clases/alumno';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-abm-alumno',
  templateUrl: './abm-alumno.component.html',
  styleUrls: ['./abm-alumno.component.css']
})
export class AbmAlumnoComponent implements OnInit {

  alumno:Alumno=new Alumno(0,"","",new Date(),0,"",0,"","");
  titulo:string="Editar";
  fechaMaxima:string="";
  edita:boolean=true;

  frm:FormGroup=new FormGroup({
    legajo:new FormControl(''),
    nombre: new FormControl('',[Validators.required,Validators.minLength(3)]),
    apellido: new FormControl('',[Validators.required,Validators.minLength(3)]),
    sexo:new FormControl('0',Validators.required),
    fechaNac: new FormControl(new Date(),Validators.required),
    edad: new FormControl(0),
    dni:new FormControl('',[Validators.required,Validators.min(1000000),Validators.max(99999999)]),
    email:new FormControl('',[Validators.required,Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
    telefono:new FormControl(''),
    direccion:new FormControl('',Validators.required)

  });

  constructor(@Inject(MAT_DIALOG_DATA) public data:Alumno) {
    if (data.id==0)
    {
      this.titulo="Nuevo";
      this.edita=false;
    }
    else{
      this.titulo="Editar";
      this.edita=true;
    }
      this.alumno=data;
   }

  ngOnInit(): void {
    let hoy:Date=new Date();
    let dia:string="";
    let mes:string="";
    if (hoy.getDate() >= 10) {
      dia = hoy.getDate().toString();
    }
    else{
      dia = '0' + hoy.getDate().toString();
    }
    if ((hoy.getMonth()+1) >= 10) {
      mes = (hoy.getMonth()+1).toString();
    }
    else{
      mes = '0' + (hoy.getMonth()+1).toString();
    }
    this.fechaMaxima=hoy.getFullYear().toString()+'-'+mes+'-'+dia  
  }



  aplicar()
  {
    if (this.edita)
    {
      console.log('Modificacion')
    }
    else
    {
      console.log('Alta');
    }
    
  }
}
