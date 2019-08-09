import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AssertService {



  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
  }

  addAssert(model): Observable<any> {
    return this.http.post<any>(`${this.url}api/assets`, model);
  }

  getAsserts(): Observable<any> {
    return this.http.get<any>(`${this.url}api/assets`);
  }


}
