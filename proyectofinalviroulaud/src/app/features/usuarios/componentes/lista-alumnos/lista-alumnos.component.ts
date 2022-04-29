import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/clases/usuario';
import { ModalConfirmacionComponent } from 'src/app/core/componentes/modal-confirmacion/modal-confirmacion.component';
import { RolesService } from 'src/app/core/servicios/roles.service';
import { UsuarioService } from 'src/app/core/servicios/usuario.service';
import { LoginService } from 'src/app/core/servicios/login.service';

import { AbmUsuarioComponent } from '../abm-usuario/abm-usuario.component';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit , OnDestroy, AfterViewInit, OnChanges{

  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  //@Input() 
  tipoLista:string="Alumno";
   rolActivo:number=0;

  nombreColumnas:string[]=["id","nombre","dni","email","telefono","editar"];
  listaAL: Usuario[]=[];
  tituloLista:string="Listado de Alumnos";
  rol:any=[];
  //datasource!:any[];
  dsAL:any;
 
  alumno$?:Observable<Usuario[]>;
  // urlPar?:Observable<ParamMap>;
  // suscripUrlPar:any;

  suscripcionAL:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog:MatDialog, 
    private servicioUsuario:UsuarioService, 
    private servicioRoles:RolesService,
    private servicioLogin: LoginService,
    private ruta:ActivatedRoute) { 
      console.log('constructor');
     
    }

  ngOnDestroy(): void {
    console.log('destroy');
    // this.suscripUrlPar.unsubscribe();
    this.suscripcionAL.unsubscribe();
    this.dsAL=null;
    this.listaAL=[];
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log('changes', changes);
  }
  
  ngOnInit(): void {
    console.log('OnInit');




      //this.obtenerAlumnos();
    
      this.listar();

      this.rolActivo=this.servicioLogin.obtenerRolActivo();
  }

  listar()
  {
    if (this.suscripcionAL!=undefined) {
      this.suscripcionAL.unsubscribe();
      }
  
    
      let rl=this.servicioRoles.getRolPorNombre(this.tipoLista);
      this.rol=[{id:rl.id,nombre:rl.nombre}];
      this.alumno$=this.servicioUsuario.getUsuariosOBS()
      this.suscripcionAL=this.alumno$
      .subscribe((datos)=>{
        console.log("suscripcionALOBS",datos);
        this.listaAL = datos.filter(al => al.rol==this.rol[0].id);
  
        this.dsAL= new MatTableDataSource<Usuario>(this.listaAL);
        this.dsAL.paginator = this.paginator;
      })
  }
  ngAfterViewInit() {
   //this.dsAL.paginator = this.paginator;
  }

  
  obtenerAlumnos(){
    
    this.servicioUsuario.getUsuarios()
    //this.servicioUsuario.getUsuariosPorRol(this.rol[0].id);

  }

  verAlumno(al:Usuario){
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion,al.rol,al.cursos),
                                    rolesPermitidos:this.rol,
                                    soloLectura:true}});

      refDialog.afterClosed().subscribe(result => {
        let updAl=this.servicioUsuario.updateUsuario(result);
        if (updAl!=null) {
          updAl.subscribe(
            data => {
  
              this.table.renderRows();
  
              this.listar();
              // this.obtenerUsuarios();
  
              this.dsAL.paginator = this.paginator;
            }
          )
        }
      }); 
      // this.table.renderRows();

      // //this.obtenerAlumnos();

      // this.dsAL.paginator = this.paginator;
        
  }

  editarAlumno(al:Usuario){
 
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion,al.rol,al.cursos),
                                                              rolesPermitidos:this.rol,
                                                              soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      let updAl=this.servicioUsuario.updateUsuario(result);
      if (updAl!=null) {
        updAl.subscribe(
          data => {

            this.table.renderRows();

            this.listar();
            // this.obtenerUsuarios();

            this.dsAL.paginator = this.paginator;
          }
        )
      }
    }); 
  }


  altaAlumno()
  {
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(0,"","",new Date(),0,"",0,"","",1,undefined),
                                                          rolesPermitidos:this.rol,
                                                          soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
        let addAL=this.servicioUsuario.addUsuario(result);
        if (addAL!=null) {
          addAL.subscribe(
            data => {

              this.table.renderRows();

              this.listar();
              // this.obtenerUsuarios();

              this.dsAL.paginator = this.paginator;
            }
          )
        }
        // this.table.renderRows();
        // // this.obtenerAlumnos();

        //  this.dsAL.paginator = this.paginator;
      }
      
    });

  }
  eliminarAlumno(al:Usuario){

    const refDialog=this.dialog.open(ModalConfirmacionComponent,{data:{titulo:"Eliminar "+this.tipoLista,subTitulo:"¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        let delAL=this.servicioUsuario.deleteUsuario(al);
        if (delAL!=null) {
          delAL.subscribe(
            data => {

              this.table.renderRows();

              this.listar();
              // this.obtenerUsuarios();

              this.dsAL.paginator = this.paginator;
            }
          )
        }
        // this.table.renderRows();
        // //this.obtenerAlumnos();
        //  this.dsAL.paginator = this.paginator;  
      }
    });
  }
}
