import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Rol } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  modo: Rol = 'usuario';
  usuario = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  ingresar() {
    this.error = '';
    this.auth.login(this.usuario, this.password, this.modo).subscribe(ok => {
      if (ok) {
        this.router.navigateByUrl('/');   // entra al panel
      } else {
        this.error = 'No se pudo iniciar sesión';
      }
    });
  }
}
