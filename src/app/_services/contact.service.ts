import { Injectable } from '@angular/core';
import { ContactModel } from '../_models';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SplashService } from './splash.service';
import { LOC_CONTACT_DATA, GET_CONTACT_URL } from './_shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _contact: BehaviorSubject<ContactModel>;
  public contact: Observable<ContactModel>;
  private _loading: BehaviorSubject<boolean>;
  public loading: Observable<boolean>;
  url: string;

  constructor(
    private http: HttpClient,
    private splashService: SplashService
  ) {
    this._contact = new BehaviorSubject<ContactModel>(JSON.parse(localStorage.getItem(LOC_CONTACT_DATA)))
    this._loading = new BehaviorSubject<boolean>(false);

    this.contact = this._contact.asObservable();
    this.loading = this._loading.asObservable();
    this.url = environment.API_URL;
  }
  
  public get currentContactValue(): ContactModel { return this._contact.value; }

  updateContactState(model: ContactModel) {
    this._contact.next(model);
    localStorage.setItem(LOC_CONTACT_DATA, JSON.stringify(model));
  }
  getContactDetails() {
    return this.http.get<ContactModel>(`${this.url}/${GET_CONTACT_URL}`).pipe().subscribe(data => {
      this.updateContactState(data);
    });
  }

}
