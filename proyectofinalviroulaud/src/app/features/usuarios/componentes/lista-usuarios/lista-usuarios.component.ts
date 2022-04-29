import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/core/clases/curso';
import { Usuario } from 'src/app/core/clases/usuario';
import { ModalConfirmacionComponent } from 'src/app/core/componentes/modal-confirmacion/modal-confirmacion.component';
import { LoginService } from 'src/app/core/servicios/login.service';
import { RolesService } from 'src/app/core/servicios/roles.service';
import { UsuarioService } from 'src/app/core/servicios/usuario.service';
import { AbmUsuarioComponent } from '../abm-usuario/abm-usuario.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit , OnDestroy, AfterViewInit, OnChanges{

  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  //@Input() 
  tipoLista:string="Usuario";

  nombreColumnas:string[]=["id","nombre","dni","email","telefono","editar"];
  listaUS: Usuario[]=[];
  tituloLista:string="Listado de Usuarios";
  rol:any=[];
  //datasource!:any[];
  ds:any;
  rolActivo:number=0;
  
  usuario$?:Observable<Usuario[]>;
  // urlPar?:Observable<ParamMap>;
  // suscripUrlPar:any;

  suscripcion:any;
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
    this.suscripcion.unsubscribe();
    this.ds=null;
    this.listaUS=[];
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log('changes', changes);
  }
  
  ngOnInit(): void {
    console.log('OnInit');
    // if (this.suscripUrlPar!=undefined) {
    // this.suscripUrlPar.unsubscribe();
    // }
    

    this.listar();


      //this.obtenerUsuarios();
    
    
      this.rolActivo=this.servicioLogin.obtenerRolActivo();
      console.log('rolActivo', this.rolActivo);
  }

  listar()
  {
    if (this.suscripcion!=undefined) {
      this.suscripcion.unsubscribe();
      }

    let rl=this.servicioRoles.getRolPorNombre(this.tipoLista);
    this.rol=[{id:rl.id,nombre:rl.nombre}];
    this.usuario$=this.servicioUsuario.getUsuariosOBS()
    this.suscripcion=this.usuario$
    .subscribe((datos)=>{
      console.log("suscripcionOBS",datos);
      this.listaUS = datos;
      //this.datasource = this.listaUS;
      
      this.ds= new MatTableDataSource<Usuario>(this.listaUS);
      this.ds.paginator = this.paginator;
    })
  }

  ngAfterViewInit() {
   //this.ds.paginator = this.paginator;
  }

  
  obtenerUsuarios(){
    console.log('obtenerUsuarios',this.tipoLista+" "+this.rol[0].nombre);
    this.servicioUsuario.getUsuarios()

    // if(this.tipoLista=="Usuario"){
    //   this.servicioUsuario.getUsuarios()

    //   //this.listaUS=this.servicioUsuario.getUsuarios();
    // }else{
    //   this.servicioUsuario.getUsuariosPorRol(this.rol[0].id);
    //   //this.listaUS=this.servicioUsuario.getUsuariosPorRol(this.rol[0].id);
    // }
  }

  verUsuario(al:Usuario){
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion,al.rol,al.cursos),
                                    rolesPermitidos:this.servicioRoles.getRoles(),
                                    soloLectura:true}});

      refDialog.afterClosed().subscribe(result => {
        let updUsr=this.servicioUsuario.updateUsuario(result);
        if (updUsr!=null) {
          updUsr.subscribe(
            data => {
  
              this.table.renderRows();
  
              this.listar();
              // this.obtenerUsuarios();
  
              this.ds.paginator = this.paginator;
            }
          )
        }
      });    
  }

  editarUsuario(al:Usuario){
 
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion,al.rol,al.cursos),
                                                              rolesPermitidos:this.servicioRoles.getRoles(),
                                                              soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      let updUsr=this.servicioUsuario.updateUsuario(result);
      if (updUsr!=null) {
        updUsr.subscribe(
          data => {
            console.log("data Update",data);
            this.table.renderRows();

            this.listar();
            // this.obtenerUsuarios();

            this.ds.paginator = this.paginator;
          }
        )
      }
      

    });    
  }


  altaUsuario()
  {
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(0,"","",new Date(),0,"",0,"","",1,undefined),
                                                          rolesPermitidos:this.servicioRoles.getRoles(),
                                                          soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
        let addUsr=this.servicioUsuario.addUsuario(result);

        if (addUsr!=null) {
          addUsr.subscribe(
            data => {

              this.table.renderRows();

              this.listar();
              // this.obtenerUsuarios();

              this.ds.paginator = this.paginator;
            }
          )
        }
        // this.table.renderRows();
        // // this.obtenerUsuarios();

        //  this.ds.paginator = this.paginator;
      }
      
    });

  }
  eliminarUsuario(al:Usuario){

    const refDialog=this.dialog.open(ModalConfirmacionComponent,{data:{titulo:"Eliminar "+this.tipoLista,subTitulo:"¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        let delUsr=this.servicioUsuario.deleteUsuario(al);

        if (delUsr!=null) {
          delUsr.subscribe(
            data => {

              this.table.renderRows();

              this.listar();
              // this.obtenerUsuarios();

              this.ds.paginator = this.paginator;
            }
          )
        }

        // this.table.renderRows();
        // //this.obtenerUsuarios();
        //  this.ds.paginator = this.paginator;  
      }
    });
  }
}


