import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule, declarations } from './home-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material';
import { PrimeNgModule } from 'src/app/primeng';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNgModule   ,
    QuillModule.forRoot()
 
  ],
  declarations: [...declarations]
})
export class HomeModule { }
