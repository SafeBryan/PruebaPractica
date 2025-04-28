import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './core/components/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule,
    MenuComponent, MatIconModule, HttpClientModule, HeaderComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSidenavOpen = true;
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  title = 'PruebaDistribuidas';
}
