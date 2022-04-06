export class Alumno
{
    id:number=0;
    nombre:string="Al";
    apellido:string="Ape";
    fechaNacimiento:Date=new Date("01/01/2022");
    dni:number=0;
    correoElectronico:string="";
    telefono:number=0;
    sexo:string="";
    direccion:string="";

    constructor(id:number,nombre:string,
    apellido:string,
    fechaNacimiento:Date,
    dni:number,
    correoElectronico:string,
    telefono:number,
    sexo:string,
    direccion:string)
    {
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.fechaNacimiento=fechaNacimiento ;
        this.dni=dni;
        this.correoElectronico=correoElectronico;
        this.telefono=telefono;
        this.sexo=sexo;
        this.direccion=direccion;
    }
 
}