import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  changeBtn:boolean=false
  btnSignupLogin:boolean=false
  token:any=localStorage.getItem('token')
  constructor(){
    if(this.token!==null){
      this.changeBtn=true
    }else{
      this.btnSignupLogin=true
    }
  }
  logout(){
    localStorage.removeItem('token')
    this.changeBtn=false
    this.btnSignupLogin=true
  }
}
