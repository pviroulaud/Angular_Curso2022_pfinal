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
     
    })


      this.obtenerAlumnos();
    
    


  }

  ngAfterViewInit() {
   this.dsAL.paginator = this.paginator;
  }

  
  obtenerAlumnos(){
    
    this.servicioUsuario.getUsuarios()
    //this.servicioUsuario.getUsuariosPorRol(this.rol[0].id);

  }

  verAlumno(al:Usuario){
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion,al.rol),
                                    rolesPermitidos:this.rol,
                                    soloLectura:true}});

      refDialog.afterClosed().subscribe(result => {
      this.servicioUsuario.updateUsuario(result);
      this.table.renderRows();

      //this.obtenerAlumnos();

      this.dsAL.paginator = this.paginator;
      });    
  }

  editarAlumno(al:Usuario){
 
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion,al.rol),
                                                              rolesPermitidos:this.rol,
                                                              soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      this.servicioUsuario.updateUsuario(result)
      this.table.renderRows();

      // this.obtenerAlumnos();

       this.dsAL.paginator = this.paginator;
    });    
  }


  altaAlumno()
  {
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(0,"","",new Date(),0,"",0,"","",1),
                                                          rolesPermitidos:this.rol,
                                                          soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
      this.servicioUsuario.addUsuario(result);
        this.table.renderRows();
        // this.obtenerAlumnos();

         this.dsAL.paginator = this.paginator;
      }
      
    });

  }
  eliminarAlumno(al:Usuario){

    const refDialog=this.dialog.open(ModalConfirmacionComponent,{data:{titulo:"Eliminar "+this.tipoLista,subTitulo:"¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        this.servicioUsuario.deleteUsuario(al);
        this.table.renderRows();
        //this.obtenerAlumnos();
         this.dsAL.paginator = this.paginator;  
      }
    });
  }
}
