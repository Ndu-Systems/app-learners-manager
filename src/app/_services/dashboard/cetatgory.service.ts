import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CetatgoryService {



  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
  }


  addCatagory(model): Observable<any> {
    return this.http.post<any>(`${this.url}api/categories`, model);
  }
  getCatagories(): Observable<any> {
    return this.http.get<any>(`${this.url}api/categories`);
  }



}
