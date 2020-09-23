import { NgModule } from '@angular/core';
import {RatingModule} from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  imports: [
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    MessageModule,
    RatingModule,
    CalendarModule
  ],
  exports: [
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    RatingModule,
    CalendarModule
  ]
})
export class PrimeNgModule {
}
