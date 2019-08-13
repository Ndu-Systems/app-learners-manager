import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index';
import { HomeComponent } from './home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent , children:[
    { path: '', component: IndexComponent },
    { path: 'login', component: SignInComponent },
    { path: 'about-us', component: AboutUsComponent },
  ]},
 
  
];
export const declarations: Array<any> = [
  IndexComponent,
  HomeComponent,
  SignInComponent,
  AboutUsComponent

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
