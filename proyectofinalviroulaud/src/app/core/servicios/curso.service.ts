import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Curso } from '../clases/curso';


@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private readonly API_URL = 'https://62474c0a4bd12c92f4fe9e29.mockapi.io/';
  listaCur: Curso[] = [];

   

  constructor(private http:HttpClient) {
    this.listaCur = [ 
    //   new Curso(1, "Curso1", "Descripcion1",100,3,2,new Date(),0),  
    // new Curso(2, "Curso2", "Descripcion2",100,3,2,new Date(),6),
    // new Curso(3, "Curso3", "Descripcion3",100,3,2,new Date(),7),
    // new Curso(4, "Curso4", "Descripcion4",100,3,2,new Date(),0),
    // new Curso(5, "Curso5", "Descripcion5",100,3,2,new Date(),0)
    ];
   }

   private manejoError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error en el frontend:', error.error.message)
    }else{
      console.warn('Error en el backend', error.status, error.message)
    }

    return throwError(() => 'Error de comunicación HTTP');
    
  }
  
   getCursosPromise(){  
    let p = new Promise<Curso[]>((resolve, reject) => {
      const error = false;

      this.http.get<Curso[]>(`${this.API_URL}/curso`, {
        headers: new HttpHeaders({
          'content-type': 'application/json'
        })
      })
      .subscribe(
        (data) => {
          
          resolve(data);
          //this.listaCur = data;
        }
      );



      // if(!error){


      //   resolve(this.listaCur);
      // }else{
      //   reject('Hubo un error');
      // }
    });

    return p;
  }

  

    getCursos() {
      return this.listaCur;
    }



    updateCursoPromise(cur: Curso) {
      if (cur!=null)
      {
        let p = new Promise<any>((resolve, reject) => {
          const error = false;
    
          this.http.put(`${this.API_URL}/curso/${cur.id}`, cur)
          .subscribe(
            (data:any) => {
              resolve(data);
            }
          );    
        });    
        return p;
      } 
      else{
        return null;
      }
      
    }
    updateCurso(cur: Curso) { 
      this.listaCur[this.listaCur.findIndex(x => x.id == cur.id)] = cur;
    }


    deleteCursoPromise(cur: Curso) {
      let p = new Promise<any>((resolve, reject) => {
        const error = false;
  
        this.http.delete(`${this.API_URL}/curso/${cur.id}`)
        .subscribe(
          (data:any) => {
            resolve(data);

          }
        );
  
      });
  
      return p;
    }
    deleteCurso(cur: Curso) {
      this.listaCur.splice(this.listaCur.findIndex(x => x.id == cur.id), 1);
    }






    addCursoPromise(cur: Curso) {
      let p = new Promise<any>((resolve, reject) => {
        const error = false;
  
        this.http.post(`${this.API_URL}/curso`, cur)
        .subscribe(
          (data:any) => {
            resolve(data);
            //this.listaCur = data;
          }
        );
  
      });
  
      return p;
    }
    addCurso(cur: Curso) {
      cur.id = this.obtenerSiguienteId() + 1;
      this.listaCur.push(cur);
    }

    getCurso(id: number) {  
      return this.listaCur[this.listaCur.findIndex(x => x.id == id)];
    }

    obtenerSiguienteId(): number {
      let max = 0;
      for (let i = 0; i < this.listaCur.length; i++) {
        if (this.listaCur[i].id > max)
          max = this.listaCur[i].id;
      }
      return max;
    }

}
