import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

interface IIcon {

  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})



export class IconService {

  private icons: IIcon[] = [
    {name: 'logo', path: '/assets/icons/logo.svg'},
    {name: 'employee', path: '/assets/icons/employee.svg'},
    {name: 'hospital', path: '/assets/icons/hospital.svg'},
    {name: 'especiality', path: '/assets/icons/especiality.svg'},
    {name: 'doctor', path: '/assets/icons/doctor.svg'},
    {name: 'queries', path: '/assets/icons/queries.svg'},
    {name: 'transaction', path: '/assets/icons/transaction.svg'},
  ]

  //MatIconREgistry
  // DomSanitizer

constructor() {}

getIcon(){
  return [...this.icons];
}
getIconByName(name: string): IIcon{
  return this.icons.find(icon => icon.name.toLowerCase() === name.toLocaleLowerCase()) as IIcon
}

    

     

}
