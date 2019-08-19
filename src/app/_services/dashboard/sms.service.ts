import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models/account/user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SendSMSBody } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private _messages = new BehaviorSubject<any[]>([]);
  messages: Observable<any[]>;
  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
    this.messages = this._messages.asObservable();

  }
  updateState(values) {
    this._messages.next(values);
  }
  // http
  send(model: SendSMSBody): Observable<any> {
    return this.http.post<any>(`${this.url}api/sms/send-sms`, model);
  }

  getMessages() {
    this.http.get<any>(`${this.url}api/sms`).subscribe(data => {
      // #TODO API
      this.updateState(data);
    }, error => {
      console.log(`Error source: ${this.url}api/parents`);
      console.log(`Error details: ${error}`);
    });
  }

}
