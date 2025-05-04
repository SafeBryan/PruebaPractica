import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from './core/components/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // <-- Agrega esta importación
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,  // Mantén esto como standalone
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MenuComponent,
    MatIconModule,
    HttpClientModule,
    HeaderComponent,
    FormsModule,
    CommonModule   // <-- Aquí es donde añades CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSidenavOpen = true;
  showMenu = true;
  title = 'PruebaDistribuidas';
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe((evt: NavigationEnd) => {
        this.showMenu = evt.urlAfterRedirects !== '/login';
      });
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
