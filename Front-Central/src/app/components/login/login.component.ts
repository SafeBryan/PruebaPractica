import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

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
        next: () => this.router.navigate(['/empleados']),
        error: (err) => {
          this.errorMessage =
            'Error al iniciar sesión en ' +
            (err.source === 'spring' ? 'Spring Boot' : 'Node.js');
        },
      });
  }
}
