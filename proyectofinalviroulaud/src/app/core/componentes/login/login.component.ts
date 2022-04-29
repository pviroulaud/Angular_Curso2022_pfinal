import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  frm:FormGroup=new FormGroup({
    usuario:new FormControl('',[Validators.required]),
    clave: new FormControl('',[Validators.required])
  });
  

  ngOnInit(): void {
  }

  ingresar()
  {
    this.loginService.doLogin(this.frm.value.usuario,this.frm.value.clave)
  }
}
