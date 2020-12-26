import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SplashService } from './splash.service';
import { User } from '../_models/user.model';
import { COMMON_CONN_ERR_MSG } from './_shared/constants';
import { GenericQueryModel } from '../_models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private splashService: SplashService
  ) {
    this.url = environment.API_URL;
  }

  get(url): Observable<any> {
    return this.http.get(`${this.url}/${url}`);
  }

  getWithQuery(url: string, query: GenericQueryModel) {
    return this.http.post(`${this.url}/${url}`,query);
  }
  actionQuery(url, data): Observable<any> {
    return this.http.post(`${this.url}/${url}`, data);
  }
}
