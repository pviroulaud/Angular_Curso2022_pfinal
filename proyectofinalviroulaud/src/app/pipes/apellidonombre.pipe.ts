import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../clases/alumno';

@Pipe({
  name: 'apellidonombre'
})
export class ApellidonombrePipe implements PipeTransform {

  transform(value: Alumno, ): string {
    let apeNombre:string="";
    if (value!=null)
    {
      if ((value.apellido!=null)&&(value.nombre!=null))
      {
        apeNombre=value.apellido+", "+value.nombre;
      }
      
    }
    
    return apeNombre;
  }

}
