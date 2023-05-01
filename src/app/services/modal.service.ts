import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  open: boolean = false;
  users: string[] = [];

  constructor(
    private http: HttpService,
    private _auth: AuthService
  ) { }

  openModal() {
    this.open = true;
    this.users = [];

    this.http.getContacts(this._auth.user.name).subscribe((data: any) => {
      this.http.getUsers().subscribe((d: any) => {
        d.users.forEach((user: User) => {
          if(user.name !== this._auth.user.name && !data.contacts.includes(user.name)) this.users.push(user.name);
        })
      })
    })
    
  }


  closeModal() {
    this.open = false;
  }
}
