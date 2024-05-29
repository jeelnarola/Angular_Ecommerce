import { Route, Router } from '@angular/router';
import { UserService } from './../../Services/User/user.service';
import { Component, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorPassword:boolean=false
  errorpasswordmsg:string=''
  loginsubmit:boolean=false
constructor(private UserService: UserService,private router:Router) {}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
 
}
loginFormcontrol = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
})
loginEmail(){
  console.log(this.loginFormcontrol.value);
  if(this.loginFormcontrol.invalid){
    this.loginsubmit=true
  }
  if(this.loginFormcontrol.valid){
    const data={email:this.loginFormcontrol.value.email,password:this.loginFormcontrol.value.password}
    this.UserService.getLogin(data).subscribe((res:any)=>{
      if(res.msg=='worng password !'){
        this.errorPassword=true
        this.errorpasswordmsg=res.msg
        setTimeout(()=>{
          this.errorPassword=false
          this.loginFormcontrol = new FormGroup({
            email: new FormControl(`${this.loginFormcontrol.value.email}`),
            password: new FormControl(''),
        })
        },2000)
      }
    })
    this.loginsubmit=false
  }
}
get emailvalidation(){return this.loginFormcontrol.get('email')}
get passwordvalidation(){return this.loginFormcontrol.get('password')}
}
