import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule, declarations } from './home-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material';
import { PrimeNgModule } from 'src/app/primeng';
import { QuillModule } from 'ngx-quill';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNgModule,
    MatSnackBarModule,

    QuillModule.forRoot()

  ],
  declarations: [...declarations]
})
export class HomeModule { }
