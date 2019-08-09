import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
  }

  addParent(model): Observable<any> {
    return this.http.post<any>(`${this.url}api/categories`, model);
  }
  getParent(): Observable<any> {
    return this.http.get<any>(`${this.url}api/categories`);
  }

}
