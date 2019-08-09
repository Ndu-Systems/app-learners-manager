import { Assert } from './../../_models/assert';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssertService {
  asserts:Observable<Assert[]>;
  private _asserts: BehaviorSubject<Assert[]>;
  url: string;
  private dataStore: {
    asserts: Assert[]
  };
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
  }

  addAssert(model): Observable<Assert> {
    return this.http.post<Assert>(`${this.url}api/assets`, model);
  }

  getAsserts(): Observable<Assert[]> {
    return this.http.get<Assert[]>(`${this.url}api/assets`);
  }


}
