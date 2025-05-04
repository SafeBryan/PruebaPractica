import { Injectable } from '@angular/core';

export interface IMenu {
  title: string;
  url: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private listMenu: IMenu[] = [
    {
      title: 'Empleados',
      url: '/empleados',
      icon: 'employee', // Ícono relacionado con hospitales
    },
    {
      title: 'Hospitales',
      url: '/hospitales',
      icon: 'hospital', // Ícono relacionado con hospitales
    },

    {
      title: 'Especialidades',
      url: '/especialidades',
      icon: 'especiality', // Ícono relacionado con especialidades
    },
    {
      title: 'Medicos',
      url: '/medicos',
      icon: 'doctor', // Ícono relacionado con médicos
    },
    {
      title: 'Consultas',
      url: '/consultas',
      icon: 'queries', // Ícono relacionado con consultas
    },
  ];

  constructor() {}

  getMenu() {
    return [...this.listMenu];
  }

  getMenuByUrl(url: string): IMenu {
    return this.listMenu.find(
      (menu) => menu.url.toLowerCase() === url.toLowerCase()
    ) as IMenu;
  }
}
