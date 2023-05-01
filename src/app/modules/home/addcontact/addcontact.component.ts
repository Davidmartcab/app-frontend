import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.scss']
})
export class AddcontactComponent {
  selected: string = '';
  @Output() sendMessage = new EventEmitter<{to: string, message: string}>();

  constructor(
    public modalService: ModalService,
    private _auth: AuthService,
    private _homeService: HomeService
  ) {

  }
  
  closeModal() {
    this.modalService.closeModal();
  }

  select(user: string) {
    this.selected = user;
  }

  sendStartChat() {
    if(this.selected === '') return
    this.modalService.closeModal();
    this.sendMessage.emit({to: this.selected, message: 'Hola ' + this.selected + ' soy ' + this._auth.user.name + '.'});
    // this.send();
  }

}
