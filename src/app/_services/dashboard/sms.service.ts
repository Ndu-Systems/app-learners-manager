import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SendSMSBody } from 'src/app/views/dashboard/models';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
  }
  send(model: SendSMSBody): Observable<any> {
    return this.http.post<any>(`${this.url}api/sms/send-sms`, model);
  }

}
