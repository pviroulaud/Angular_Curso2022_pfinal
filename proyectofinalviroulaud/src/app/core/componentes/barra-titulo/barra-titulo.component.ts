import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-barra-titulo',
  templateUrl: './barra-titulo.component.html',
  styleUrls: ['./barra-titulo.component.css']
})
export class BarraTituloComponent implements OnInit {

  nombreUsuario:string="";
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    let u=this.loginService.obtenerUsuarioActual();
    if(u!=null)
    {
      this.nombreUsuario=u.nombre+" "+u.apellido;
    }
    
  }
  cerrarSesion()
  {
    this.loginService.cerrarSesion()
    this.router.navigate(['login']).then((r) => false);
  }
}
