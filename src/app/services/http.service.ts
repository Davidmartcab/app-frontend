import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'http://' + window.location.hostname + ':4000';
  // url = 'http://localhost:4000';


  constructor(
    private http: HttpClient
  ) {}

  newUser(name: string): Observable<Login> {
    return this.http.post<Login>(this.url + '/user/new', {name: name})
  }

  deleteUser(name: string): Observable<Login> {
    return this.http.post<Login>(this.url + '/user/delete', {name: name})
  }
  
  comprobarUser(name: string): Observable<Login> {
    return this.http.get<Login>(this.url + '/user/' + name)
  } 

  getContacts(name: string): Observable<Contacts> {
    return this.http.post<Contacts>(this.url + '/chat/getcontacts', {name: name})
  }

  getMessages(from: string, to: string): Observable<Messages> {
    return this.http.post<Messages>(this.url + '/chat/get', {from: from, to: to})
  }

  sendMessage(from: string, to: string, message: string): Observable<SendMessage> {
    return this.http.post<SendMessage>(this.url + '/chat/send', {from: from, to: to, message: message})
  }

  getNewMessages(chatName: string, name: string): Observable<NewMessages> {
    return this.http.get<NewMessages>(this.url + '/chat/' + chatName + '/' + name)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }

  logOutUser(name: string): Observable<Login> {
    return this.http.get<Login>(this.url + '/user/logout/' + name)
  }
}

interface Login {
  code: number,
  message: string,
  user: User
}

interface Contacts {
  code: number,
  contacts: string[]
}

interface Messages {
  messages: Message[],
  code: number
}

interface SendMessage {
  code: number,
  message: string
}

interface NewMessages {
  code: number
}