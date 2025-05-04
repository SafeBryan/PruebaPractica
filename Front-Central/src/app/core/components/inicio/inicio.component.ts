import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'], // corregido: styleUrl → styleUrls
  standalone: true,
  imports: [],
})
export class InicioComponent {
  constructor(private router: Router) {}

  irAGestion(): void {
    this.router.navigate(['/hospitales']);
  }
}
