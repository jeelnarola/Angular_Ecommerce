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
  successalert:boolean=false
  passwordFieldType :string='password'
  toggleButtonText:string='Show Password'
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
  if(this.loginFormcontrol.invalid){
    this.loginsubmit=true
  }
  if(this.loginFormcontrol.valid){
    const data={email:this.loginFormcontrol.value.email,password:this.loginFormcontrol.value.password}
    this.UserService.getLogin(data).subscribe((res:any)=>{
      console.log("res",res);
      if(res.msg=='User Not Extis...'){
        this.errorPassword=true
        this.errorpasswordmsg=res.msg
        setTimeout(()=>{
          this.errorPassword=false
          this.router.navigate(['/signup'])
        },2000)
      }
      else if(res.msg=='worng password !'){
        this.errorPassword=true
        this.errorpasswordmsg=res.msg
        setTimeout(()=>{
          this.errorPassword=false
          this.loginFormcontrol = new FormGroup({
            email: new FormControl(`${this.loginFormcontrol.value.email}`),
            password: new FormControl(''),
        })
        },2000)
      }else{
        this.errorpasswordmsg = 'User Login Successfully...';       
        this.successalert = true;
        console.log(res);
        sessionStorage.setItem('role',res.data.role)
        sessionStorage.setItem('token',res.token)
        setTimeout(()=>{
          this.successalert=false
          this.router.navigate(['/home'])
        },2000)
      }
    })
    this.loginsubmit=false
  }
}
togglePasswordVisibility(){
  this.passwordFieldType=(this.passwordFieldType=='password')?'text':'password';
  this.toggleButtonText=(this.passwordFieldType=='password')?'Show Password':'Hide Password';
}
get emailvalidation(){return this.loginFormcontrol.get('email')}
get passwordvalidation(){return this.loginFormcontrol.get('password')}
}
