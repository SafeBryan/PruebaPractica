import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http'; // necesario para peticiones HTTP

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Suponiendo que la respuesta contiene un token
        if (response.token) {
          this.authService.authenticate(response.token);
        } else {
          this.loginError = 'Usario o contraseña incorrecta';
          setTimeout(() => this.loginError = '', 5000);
        }
      },
      error: (err) => {
        console.log("asdasdasdasd")
        console.log(err)
        this.loginError = 'Falla en el servidor';
        setTimeout(() => this.loginError = '', 5000);
      }
    });
  }
}
