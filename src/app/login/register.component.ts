import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_pluings(): any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private tP: Title,
    private usuarioS: UsuarioService,
    private router: Router
    ) {
    this.tP.setTitle('AdminPro ! Registro');
   }


   sonIguales(valor1: string, valor2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[valor1].value;
      const pass2 = group.controls[valor2].value;

      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
   }

  ngOnInit() {
    init_pluings();
    this.forma = new FormGroup({
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.sonIguales('password', 'password2')});

    this.forma.setValue ({
      nombres: 'test ',
      apellidos: 'test ',
      email: 'test@test.test',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  CrearFrom() {
    this.forma = new FormGroup({
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.sonIguales('password', 'password2')});

    this.forma.setValue ({
      nombres: 'test ',
      apellidos: 'test ',
      email: 'test@test.test',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      return Swal.fire({
        type: 'error',
        title: 'Términos y condiciones ',
        text: 'Debe aceptar los términos y condiciones para poder continuar.',
      });
    }

    const usuario = new Usuario(
      this.forma.value.nombres,
      this.forma.value.apellidos,
      this.forma.value.email,
      this.forma.value.password
    );

    this.usuarioS.crearUsusario(usuario).subscribe( Response => {
      this.forma.reset();
      this.router.navigate(['/login']);
    });
  }
}
