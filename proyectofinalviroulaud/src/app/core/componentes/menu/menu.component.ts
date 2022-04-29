import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  cargarCursos()
  {
    this.router.navigate(['cursos']);
  }
  // cargarProfesores()
  // {
  //   this.router.navigate(['usuarios/Profesor'],{ replaceUrl: true });
  // }
  // cargarAdmin()
  // {
  //   this.router.navigate(['usuarios/Administrador'],{ replaceUrl: true });
  // }
}
