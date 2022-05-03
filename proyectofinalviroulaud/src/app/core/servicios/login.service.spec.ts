import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { Usuario } from '../clases/usuario';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../app.material.module';
import { CoreModule } from '../core.module';
import { Router } from '@angular/router';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      imports:[BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        CoreModule],
        providers:[UsuarioService,LoginService]
    })
    .compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('Se crea el servicio de inicio de sesion LoginService', () => {
    expect(service).toBeTruthy();
  });

  it(
    'El login funciona correctamente',(done) => {
      // const mockUsuario: Usuario[] = [
      //   new Usuario(1,"Alumno1","Apellido",new Date("11/17/1983"),12345678,"correo1@mail.com",123456,"1","direccion1",1),
      //   new Usuario(2,"Alumno2","Apellido2",new Date("01/01/2020"),12345678,"correo2@mail.com",456789,"0","direccion2",1)];

       // mockUsuario[0].setContraseña("321");

      service.llamadaLogin("admin@b.com", "123").subscribe(
        (data) => {
          console.log("TEST _ DATA", data);
          
          let u=service.validarDatosUsuario(data,"admin@b.com", "123");
          //let u:Usuario| undefined = service.obtenerUsuarioActual();

          console.log("TEST - Usuario Actual",u);
                    
          if (u!=undefined){
            console.log("TEST - ID DEL Usuario Actual",u.id);
            expect(u.id.toString()).toBe('3');
          }
          done();
        }
      );
      
    }    
  )

});
