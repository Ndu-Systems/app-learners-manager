import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SEND_EMAIL_RESET_PASSWORD, SEND_EMAIL_ACTIVATE_ACCOUNT, SEND_EMAIL_BILLING, SEND_EMAIL_GENERAL_TEXT } from '../_shared';
import { Email } from 'src/app/_models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendAccountActivationEmail(data: Email): Observable<any> {
    return this.http.post<any>(SEND_EMAIL_ACTIVATE_ACCOUNT, data);
  }
  sendGenarlTextEmail(data: Email): Observable<any> {
    return this.http.post<any>(SEND_EMAIL_GENERAL_TEXT, data);
  }

  sendResetPasswordEmail(data: Email): Observable<any> {
    return this.http.post<any>(SEND_EMAIL_RESET_PASSWORD, data);
  }
  
  sendBillingEmail(data: Email): Observable<any> {
    return this.http.post<any>(SEND_EMAIL_BILLING, data);
  }
}
