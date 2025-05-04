import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .loginAmbos({ username: this.username, password: this.password })
      .subscribe({
        next: (usuario) => {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.router.navigate(['/']).then(() => {
            location.reload(); // 🔁 Recarga para actualizar el header
          });
        },
        error: (err) => {
          this.errorMessage =
            'Error al iniciar sesión en ' +
            (err.source === 'spring' ? 'Spring Boot' : 'Node.js');
        },
      });
  }
}
