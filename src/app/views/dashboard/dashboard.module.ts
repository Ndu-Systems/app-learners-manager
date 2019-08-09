import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule, declarations } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    AutoCompleteModule
  ],
  declarations: [...declarations],
  providers: [MessageService],
})
export class DashboardModule { }
