
import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor( private router: Router) {}
  @Output() toggleSidenav = new EventEmitter<void>();
  singOut() {
    
    this.router.navigate(['/']); 
  }
}
