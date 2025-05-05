import { Injectable } from '@angular/core';

interface IIcon {
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private icons: IIcon[] = [
    { name: 'employee', path: '/assets/icons/employee.svg' }, 
    { name: 'queries', path: '/assets/icons/queries.svg' },
  ];

  constructor() {}

  getIcon() {
    return [...this.icons];
  }

  getIconByName(name: string): IIcon {
    return this.icons.find(
      (icon) => icon.name.toLowerCase() === name.toLowerCase()
    ) as IIcon;
  }
}
