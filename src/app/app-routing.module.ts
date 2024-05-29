import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserSignupComponent } from './component/user-signup/user-signup.component';
import { DashbordComponent } from './component/dashbord/dashbord.component';
import { LoginComponent } from './component/login/login.component';
import { AllProductComponent } from './component/all-product/all-product.component';
import { authGuard } from './guards/auth.guard';

// import { HomeComponent } from './home/home.component';

const routes: Routes = [
{
  path:'home',
  canActivate:[authGuard],
  component:DashbordComponent,
  // children:[
  //   {path:'signup',component:UserSignupComponent}, 
  //   {path:'login',component:LoginComponent}, 
  //   {path:'AllProduct',component:AllProductComponent},
  // ]
},
    {path:'signup',component:UserSignupComponent}, 
    {path:'login',component:LoginComponent}, 
    {path:'AllProduct',component:AllProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
