import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  changeBtn:boolean=false
  btnSignupLogin:boolean=false
  logusername:string='logout'
  token:any=sessionStorage.getItem('token')
  admin:boolean=false
  constructor(){
    if(this.token!==null){
      this.changeBtn=true
    }else{
      this.btnSignupLogin=true
    }
    if(sessionStorage.getItem('role')=='admin'){
      this.admin=true
    }
  }
  logout(){
    sessionStorage.removeItem('token')
    this.changeBtn=false
    this.btnSignupLogin=true
  }
}
