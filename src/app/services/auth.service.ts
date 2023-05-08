import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = new User();

  constructor(
    private router: Router,
    private http: HttpService
  ) {
    if(localStorage.getItem('user') === null) {
      this.router.navigate(['/login']);
    } else {
      let user = localStorage.getItem('user');
      if(user !== null) {
        let userArr = user.split('|||');
        if(userArr[0] !== '' && userArr[1] !== '') {
          this.user.setValues(userArr[0], userArr[1]);
          this.login(this.user.name, 1);
        }
      }
    }

    if(this.user._id === '' || this.user.name === '')
      this.router.navigate(['/login']);
    else
      this.router.navigate(['/home']);
  }

  login(name: string, codex?: number) {
    let code: number = -1;
    this.http.newUser(name).subscribe((res) => {
      console.log("Login",res);
      code = res.code;
      if(res.user.connected)code = 3;
      this.user.setValues(res.user._id, res.user.name);
      if(code === 0 || code === 1){
        if(codex && code === 0) {
          this.http.deleteUser(name).subscribe((res) => {
            this.router.navigate(['/login']);
            localStorage.removeItem('user');
            this.user.setValues('', '');
          });
        }
        this.router.navigate(['/home']);
        localStorage.setItem('user', this.user._id + '|||' + this.user.name);
      }else{
        this.router.navigate(['/login']);
        localStorage.removeItem('user');
        this.user.setValues('', '');
      }
    })

  }

  logout() {
    console.log("Logout",this.user.name);
    this.http.logOutUser(this.user.name).subscribe((res) => {
      this.router.navigate(['/login']);
      localStorage.removeItem('user');
    });
    this.user.setValues('', '');
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
  }
}
