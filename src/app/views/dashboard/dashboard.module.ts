import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule, declarations } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material';
import { PrimeNgModule } from 'src/app/primeng';
import { QuillModule } from 'ngx-quill';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNgModule,
    MatSnackBarModule,
    QuillModule.forRoot()

  ],
  declarations: [...declarations]
})
export class DashboardModule { }
