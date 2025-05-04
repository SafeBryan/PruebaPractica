import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './core/components/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './shared/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MenuComponent,
    MatIconModule,
    HeaderComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSidenavOpen = true;

  constructor(public authService: AuthService, private router: Router) {}

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  esLogin(): boolean {
    return this.router.url === '/login';
  }

  title = 'PruebaDistribuidas';
}
