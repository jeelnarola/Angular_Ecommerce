import { UserService } from './../../Services/User/user.service';
import { Component, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent {
  showhidden: boolean = true;
  admin:boolean=false
  signupForm!: FormGroup;
  submitbtn: boolean = false;
  userms: string = '';
 
  
  constructor(private UserService: UserService,private router:Router) {}
  ngOnInit(): void {
    this.SignupDataGet();
    if(this.UserService.isLoggIn()){
      this.router.navigate(['/home']);
    }
   
    
  }

  SignupDataGet() {
    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z][A-Za-z0-9]{2,29}$'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,6}'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      role: new FormControl(''),
    });
  }
  close() {
    this.showhidden = false;
  }

  @HostBinding('class.alertActive') erroralert: boolean = false;
  @HostBinding('class.alertActive') successalert: boolean = false;
   signup() {
    if (this.signupForm.invalid) {
      this.submitbtn = true;
    }

    if (this.signupForm.valid) {
      console.log("this",this.signupForm.value);
      
      this.UserService.PostSignup(this.signupForm.value).subscribe(
        (res: any) => {
          if (res.msg == 'User Alrdy Extis...') {
            this.userms = res.msg;
            this.erroralert = true;
            setTimeout(()=>{
              this.router.navigate(['/login']);
            },2000)
          } else {
            this.userms = res.msg;
            this.successalert = true;
            setTimeout(()=>{
              this.router.navigateByUrl('/home');
              this.showhidden=false
            },2000)
            console.log(res);
            sessionStorage.setItem('token',res.token)
            sessionStorage.setItem('role',res.data.role)
          }
        }
      );
    }
  }
 
  get usernameValidation() {
    return this.signupForm.get('username');
  }
  get emailValidation() {
    return this.signupForm.get('email');
  }
  get passwordValidation() {
    return this.signupForm.get('password');
  }
}
