import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API_URL = 'https://62474c0a4bd12c92f4fe9e29.mockapi.io/';
  private usuarioLogueado?: Usuario;
  private sesionActiva = false;
  private rolActivo:number=0;

  constructor(private http:HttpClient,private servicioUsuario:UsuarioService,private router: Router) { }
  
  private manejoError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error en el frontend:', error.error.message)
    }else{
      console.warn('Error en el backend', error.status, error.message)
    }

    return throwError(() => 'Error de comunicación HTTP');
    
  }

  authUsuario(usuario:string,pass:string)
  {
    // let lista =this.http.get<Usuario[]>(`${this.API_URL}/usuario`, {
    //   headers: new HttpHeaders({
    //     'content-type': 'application/json'
    //   })
    // }).pipe(catchError(this.manejoError))
    this.llamadaLogin(usuario,pass)
    .subscribe((data)=>{

      this.validarDatosUsuario(data,usuario,pass);
      
      
    });

  }

  validarDatosUsuario(data:Usuario[],usuario:string,pass:string)
  {
    let usr=data.find(x=>x.correoElectronico==usuario && x.pass==pass);
    if (usr!=null)
    {
      if ((usr.rol==3) || (usr.rol==4)) // Solo se permite el ingreso a Administradores y Usuarios (Alumnos y Profesores no tienen acceso)
      {
        console.log("usuario obtenido de la llamada",usr);
        this.setUsuarioActual(usr);
      }
    }
    return usr;
  }

  llamadaLogin(usuario:string,pass:string)
  {
    return this.http.get<Usuario[]>(`${this.API_URL}/usuario`, {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }).pipe(catchError(this.manejoError))
  }

  doLogin(usuario:string,pass:string)
  {
    // llamada API
    this.authUsuario(usuario,pass)

  }

  cerrarSesion()
  {
    this.usuarioLogueado = undefined;
    this.rolActivo=0;
    this.sesionActiva=false;
  }
  
  setUsuarioActual(usuario: Usuario){
    //console.log("Usuario Actual",usuario);
    this.usuarioLogueado = usuario;
    this.rolActivo=usuario.rol;
    this.sesionActiva=true;
    this.router.navigate(['usuarios']);
  }

  obtenerUsuarioActual(){
    return this.usuarioLogueado;
  }

  obtenerSesionActiva(){
    return this.sesionActiva;
  }
  obtenerRolActivo(){
    return this.rolActivo;
  }
}
