import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index';
import { HomeComponent } from './home.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: HomeComponent , children:[
    { path: '', component: IndexComponent },
    { path: 'sign-up', component: SignInComponent }
  ]},
 
  
];
export const declarations: Array<any> = [
  IndexComponent,
  HomeComponent,
  SignInComponent
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
