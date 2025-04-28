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
    {name: 'agent', path: '/assets/icons/agent.svg'},
    {name: 'client', path: '/assets/icons/client.svg'},
    {name: 'contact', path: '/assets/icons/contact.svg'},
    {name: 'favorite', path: '/assets/icons/favorite.svg'},
    {name: 'property', path: '/assets/icons/properties.svg'},
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
