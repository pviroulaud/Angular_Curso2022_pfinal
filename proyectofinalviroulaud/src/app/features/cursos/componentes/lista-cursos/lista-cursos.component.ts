import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { Usuario } from 'src/app/core/clases/usuario';
import { ModalConfirmacionComponent } from 'src/app/core/componentes/modal-confirmacion/modal-confirmacion.component';

import { CursoService } from 'src/app/core/servicios/curso.service';
import { UsuarioService } from 'src/app/core/servicios/usuario.service';
import { AbmCursoComponent } from '../abm-curso/abm-curso.component';

import { Curso } from 'src/app/core/clases/curso';
import { LoginService } from 'src/app/core/servicios/login.service';

//import { MatTable, MatTableDataSource } from 'src/app/core/app.material.module';
//import { MatTable, MatTableDataSource } from 'src/app/core/core.module';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  dataSource:any;
  rolActivo:number=0;
  listaAlumnosCurso:Usuario[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  nombreColumnas:string[]=["id","nombre","descripcion","totalClases","profesor","editar"];
  listaCur: Curso[]=[];

  constructor(public dialog:MatDialog, private servicioCurso:CursoService, private servicioUsuario:UsuarioService,private servicioLogin: LoginService) { }

  ngOnInit(): void {
    this.rolActivo=this.servicioLogin.obtenerRolActivo();
    this.obtenerCursos();
    this.dataSource= new MatTableDataSource<Curso>(this.listaCur);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  obtenerProfesor(id:number):Usuario{
    return this.servicioUsuario.getUsuario(id)!;

  }

  listarAlumnos(cur:Curso)
  {
    this.servicioUsuario.getUsuariosPorRolPromise(1).then(res=>{
      this.listaAlumnosCurso=[];
      for (let i = 0; i < res.length; i++) {
        for(let j=0;j<res[i].cursos.length;j++)
        {
          if(res[i].cursos[j].id==cur.id)
          {
            this.listaAlumnosCurso.push(res[i]);
          }
        }        
      }

      

      this.servicioUsuario.getUsuariosPorRolPromise(2).then((data)=>{
        const refDialog=this.dialog.open(AbmCursoComponent,{data:{datosCurso: new Curso(cur.id,cur.nombre,cur.descripcion,cur.cupo,cur.totalClases,cur.totalClases,cur.fechaInicio,cur.profesorId),
                                                                  profesores:data,
                                                                  listaAlumnos:this.listaAlumnosCurso,
                                                                  soloLectura:true}});
        refDialog.afterClosed().subscribe(result => {
        let cur=  this.servicioCurso.updateCursoPromise(result)
        if (cur!=null)
        {
          cur.then((datos)=>{
            
            this.obtenerCursos();
  
            this.dataSource.paginator = this.paginator;
          })
        }    
        });    
      });


    });

  }
  obtenerCursos(){
    
    this.servicioCurso.getCursosPromise().then((data)=>{
      this.listaCur=data;
      this.dataSource= new MatTableDataSource<Curso>(this.listaCur);
      this.table.renderRows();

      //this.obtenerUsuarios();

      this.dataSource.paginator = this.paginator;
    })
    .catch((err)=>{
      console.log(err);
    });

    //this.listaCur=this.servicioCurso.getCursos();
  }

  altaCurso()
  {
    this.servicioUsuario.getUsuariosPorRolPromise(2).then((data)=>{
      const refDialog=this.dialog.open(AbmCursoComponent,{data:{datosCurso:new Curso(0,"","",0,0,0,new Date(),0),
                                                                profesores:data,
                                                                listaAlumnos:[],
                                                                soloLectura:false}});
      
      refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
      this.servicioCurso.addCursoPromise(result)
      .then((datos)=>{

      this.obtenerCursos();

      this.dataSource.paginator = this.paginator;
      })
      }
      });
    });

    
  }
  editarCurso(cur:Curso){
    this.servicioUsuario.getUsuariosPorRolPromise(2).then((data)=>{
      const refDialog=this.dialog.open(AbmCursoComponent,{data:{datosCurso: new Curso(cur.id,cur.nombre,cur.descripcion,cur.cupo,cur.totalClases,cur.totalClases,cur.fechaInicio,cur.profesorId),
                                                                profesores:data,
                                                                listaAlumnos:[],
                                                                soloLectura:false}});
      refDialog.afterClosed().subscribe(result => {
      let cur=  this.servicioCurso.updateCursoPromise(result)
      if (cur!=null)
      {
        cur.then((datos)=>{
          
          this.obtenerCursos();

          this.dataSource.paginator = this.paginator;
        })
      }    
      });    
    });
  }
  eliminarCurso(cur:Curso){
    const refDialog=this.dialog.open(ModalConfirmacionComponent,{data:{titulo:"Eliminar Curso",subTitulo:"¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        this.servicioCurso.deleteCursoPromise(cur)
        .then((datos)=>{
          console.log(datos);
          this.obtenerCursos();

          this.dataSource.paginator = this.paginator;
        })
      }
    });
  }
}