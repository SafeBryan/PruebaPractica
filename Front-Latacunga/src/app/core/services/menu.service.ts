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
      title: 'Pacientes',
      url: '/pacientes',
      icon: 'employee', 
    },
    {
      title: 'Consultas',
      url: '/consultas',
      icon: 'queries',
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
