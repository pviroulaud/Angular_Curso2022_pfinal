import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Curso } from '../clases/curso';
import { Usuario } from '../clases/usuario';
import { LoginService } from './login.service';


/*
MockAPI:
https://62474c0a4bd12c92f4fe9e29.mockapi.io/

*/

@Injectable({
  providedIn: 'root' // Aqui se pone el componente que lo necesita, en este caso todos los componentes porque se indica root
})
export class UsuarioService {
  private readonly API_URL = 'https://62474c0a4bd12c92f4fe9e29.mockapi.io/';
  private usuarioObservable: Observable<Usuario[]>;
  private usuarioSubject: Subject<Usuario[]>;

  listaUSR: Usuario[]=[
    // new Usuario(1,"Alumno1","Apellido",new Date("11/17/1983"),12345678,"correo1@mail.com",123456,"1","direccion1",1),
    //   new Usuario(2,"Alumno2","Apellido2",new Date("01/01/2020"),12345678,"correo2@mail.com",456789,"0","direccion2",1),
    //   new Usuario(3,"Alumno3","Apellido3",new Date("01/01/2010"),12345678,"correo3@mail.com",123456,"2","direccion3",1),
    //   new Usuario(4,"Alumno4","Apellido4",new Date("01/01/2007"),12345678,"correo4@mail.com",456789,"2","direccion4",1),
    //   new Usuario(5,"Alumno5","Apellido5",new Date("01/01/2009"),12345678,"correo5@mail.com",789123,"1","direccion5",1),
    //   new Usuario(6,"Profesor1","Apellido6",new Date("01/01/2000"),12345678,"correo6@mail.com",123456,"1","direccion6",2),
    //   new Usuario(7,"Profesor2","Apellido7",new Date("01/01/2001"),12345678,"correo7@mail.com",456789,"0","direccion7",2),
    //   new Usuario(8,"UsuarioAdmin1","Apellido8",new Date("01/01/2002"),12345678,"correo8@mail.com",123456,"1","direccion8",3),
    //   new Usuario(9,"UsuarioAdmin2","Apellido9",new Date("01/01/2003"),12345678,"correo9@mail.com",456789,"0","direccion9",3),
    //   new Usuario(10,"UsuarioUsr3","Apellido10",new Date("01/01/2004"),12345678,"correo10@mail.com",123456,"2","direccion10",4),
    //   new Usuario(11,"UsuarioUsr4","Apellido11",new Date("01/01/2005"),12345678,"correo11@mail.com",456789,"2","direccion11",4),
    //   new Usuario(12,"UsuarioUsr5","Inactivo",new Date("01/01/2005"),12345678,"correo12@mail.com",456789,"2","direccion12",4)
  ];


  constructor(private http:HttpClient) {
    

       this.usuarioSubject = new Subject();
       this.usuarioObservable = new Observable((observer) => {
         
         observer.next(this.listaUSR);
       })

       
  }

  private manejoError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error en el frontend:', error.error.message)
    }else{
      console.warn('Error en el backend', error.status, error.message)
    }

    return throwError(() => 'Error de comunicación HTTP');
    
  }

  getUsuariosOBS():Observable<any>{

  this.usuarioObservable =this.http.get<Usuario[]>(`${this.API_URL}/usuario`, {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }).pipe(catchError(this.manejoError));
  return this.usuarioObservable
  }






  getUsuarios() { 
    this.usuarioSubject.next(this.listaUSR);
  }

  getUsuario(id:number) {
    return this.listaUSR.find(usuario => usuario.id == id);
  }
  getUsuariosPorRolPromise(rolId:number) {

    let p = new Promise<Usuario[]>((resolve, reject) => {
      const error = false;

      this.http.get<Usuario[]>(`${this.API_URL}/usuario`, {
        headers: new HttpHeaders({
          'content-type': 'application/json'
        })
      })
      .subscribe(
        (data) => {
          console.log("getUsuariosPorRolPromise",data);
          resolve(data.filter(usuario => usuario.rol == rolId));
          //this.listaCur = data;
        }
      );
    });

    return p;
  }

  getUsuariosPorRol(rolId:number) {
    let us:Usuario[]=this.listaUSR.filter(usuario => usuario.rol != rolId)
    for(var n=0;n<us.length;n++)
    {
        this.deleteUsuarioId(us[n].id);      
    }

    this.usuarioSubject.next(this.listaUSR);
  }
 

  getUsuariosPorRolId(rolId:number){
    return this.listaUSR.filter(usuario => usuario.rol == rolId)
  }


  addUsuario(al:Usuario) {
    if (al!=undefined)
    {
    // al.id=this.obtenerSiguienteId()+1;
    // this.listaUSR.push(al);

    return this.http.post(`${this.API_URL}/usuario`, al);

    //this.usuarioSubject.next(this.listaUSR);
    }
    else
    {
      return null;
    }
  }



  deleteUsuario(al:Usuario){
    if (al!=undefined)
    {
      return this.http.delete(`${this.API_URL}/usuario/${al.id}`)
    // this.listaUSR.splice(this.listaUSR.findIndex(x=>x.id==al.id),1);
    // this.usuarioSubject.next(this.listaUSR);
    }
    else
    {
      return null;
    }
  }
  deleteUsuarioId(id:number){
    return this.http.delete(`${this.API_URL}/usuario/${id}`)
    // this.listaUSR.splice(this.listaUSR.findIndex(x=>x.id==id),1);
    // this.usuarioSubject.next(this.listaUSR);
    
  }

  updateUsuario(al:Usuario){
    if (al!=undefined)
    {
      console.log("updateUsuario",al);
      return this.http.put(`${this.API_URL}/usuario/${al.id}`, al)


      //this.listaUSR[this.listaUSR.findIndex(x=>x.id==al.id)]=al;
      //this.usuarioSubject.next(this.listaUSR);
    }
    else
    {
      return null;
    }
  }

  asignarCurso(al:Usuario,cur:Curso){
    if ((al!=undefined)&&(cur!=undefined))
    {
    al.cursos.push(cur);
    }
  }
  desasignarCurso(al:Usuario,cur:Curso){
    if ((al!=undefined)&&(cur!=undefined))
    {
    al.cursos.splice(al.cursos.findIndex(x=>x.id==cur.id),1);
    }
  }
  
  obtenerSiguienteId():number{
    let max=0;
    for(let i=0;i<this.listaUSR.length;i++){
      if (this.listaUSR[i].id>max)
        max=this.listaUSR[i].id;
    }
    return max;
  }
}
