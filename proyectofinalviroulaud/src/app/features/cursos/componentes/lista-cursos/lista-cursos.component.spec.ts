import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ListaCursosComponent } from './lista-cursos.component';
import { Curso } from '../../../../core/clases/curso';
import { AppMaterialModule } from '../../../../core/app.material.module';
import { Directive, Renderer2,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CursosRoutingModule } from '../../cursos-routing.module';
import { AbmCursoComponent } from '../abm-curso/abm-curso.component';
import { CursoService } from 'src/app/core/servicios/curso.service';
import { UsuarioService } from 'src/app/core/servicios/usuario.service';
import { LoginService } from 'src/app/core/servicios/login.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/core/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/app/core/core.module';

describe('ListaCursosComponent', () => {
  let component: ListaCursosComponent;
  let fixture: ComponentFixture<ListaCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCursosComponent,AbmCursoComponent ],
      imports:[ CommonModule,
        SharedModule,
        AppMaterialModule,
        ReactiveFormsModule,
        CursosRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule],
        providers:[CursoService,UsuarioService,LoginService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creacion de componente ListaCursosComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Lista cursos en la grilla',()=>{
    const mockCursos:Curso[]=[ 
      new Curso(1, "Curso1", "Descripcion1",100,3,2,new Date(),0),  
      new Curso(2, "Curso2", "Descripcion2",100,3,2,new Date(),0),
      new Curso(3, "Curso3", "Descripcion3",100,3,2,new Date(),0),
      new Curso(4, "Curso4", "Descripcion4",100,3,2,new Date(),0),
      new Curso(5, "Curso5", "Descripcion5",100,3,2,new Date(),0)
      ];

    

    const front= fixture.nativeElement as HTMLElement;
    const table=front.getElementsByClassName('mat-table')[0];
    component.cargarGrilla(mockCursos);
    fixture.detectChanges();
    if (table!=null){
      
      const rows=front.getElementsByClassName('mat-row').length.toString();
      let rowsPerPage= front.getElementsByClassName('mat-select')[0].getAttribute('ng-reflect-value');
      if (rowsPerPage!=null){
        // Se espera que en la tabla aparezcan 5 filas a menso que el paginador este establecido en otro valor (3)
        if (parseInt(rowsPerPage)>=5)
        {
          expect(rows).toBe("5");
        }
        else{
          expect(rows).toBe(rowsPerPage);
        }
      }
      
    }
  })
});
