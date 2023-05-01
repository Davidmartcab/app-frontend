import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpService
  ) { }

  getContacts(name: string) {
    return this.http.getContacts(name)
  }

  getChat(from: string, to: string) {
    return this.http.getMessages(from, to)
  }

  sendMessage(from: string, to: string, message: string) {
    return this.http.sendMessage(from, to, message)
  }

  lookForNewMessages(chatName: string, name: string) {
    return this.http.getNewMessages(chatName, name)
  }

  goToLogin(name: string) {
    return this.http.comprobarUser(name)
  }

}
