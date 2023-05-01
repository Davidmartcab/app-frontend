import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _homeService: HomeService,
    public modalService: ModalService
  ) {}

  userName: string = '';
  contacts: string[] = [];
  contactSelected: string = '';
  chat: Message[] = [];
  newMessage: string = '';

  ngOnInit(): void {
    this.userName = this._auth.user.name;
    this.lookForNewMessages();
    this.getContacts();
  }

  async lookForNewMessages() {
    while(true) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.getContacts();
      this.comprobar();
      if(this.contactSelected !== '') {
        this._homeService.lookForNewMessages(this.contactSelected, this._auth.user.name).subscribe(res => {
          if(res.code === 0) {
            this.getChat(this.contactSelected);
          }
        })

      }else {
        this.chat = [];
      }
    }
  }

  comprobar() {
    this._homeService.goToLogin(this._auth.user.name).subscribe(res => {
      if(res.code === 1) this._auth.logout();
    });
  }
  
  getContacts() {
    this._homeService.getContacts(this._auth.user.name).subscribe(res => {
      if(this.contacts !== res.contacts){
        this.contacts = res.contacts;
        if(!res.contacts.includes(this.contactSelected)) {
          this.contactSelected = '';
        }
      }
    })
  }

  getChat(name: string) {
    this.contactSelected = name;
    this.chat = [];
    this._homeService.getChat(this._auth.user.name, name).subscribe(res => {
      res.messages.forEach(message => {
        this.chat.push(new Message(message._id, message.from, message.to, message.message, message.date));
      });
    })
    setTimeout(() => {
      let chat = document.getElementById('chat');
      chat!.scrollTop = chat!.scrollHeight;
    }, 20);
  }

  getDate(date: Date) {
    let d = new Date(date);
    return d.getHours() + ':' + d.getMinutes();
  }

  sendMessage(to?: {to: string, message: string}) {
    this.contactSelected = to?.to || this.contactSelected;
    let message = to?.message || this.newMessage;
    if (message.length <= 0) return
    this._homeService.sendMessage(this._auth.user.name, this.contactSelected, message).subscribe(res => {
      this.getChat(this.contactSelected);
      this.newMessage = '';
    });
  }

  focusInput() {
    setTimeout(() => {
      let input = document.getElementById('inputMessage');
      input!.focus();
    }, 20);
  }

  logout() {
    this._auth.logout();
  }

  openModal() {
    this.modalService.openModal();
  }
}
