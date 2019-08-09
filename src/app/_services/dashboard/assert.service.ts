import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Assert } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class AssertService {
  asserts: Observable<Assert[]>;
  private _asserts: BehaviorSubject<Assert[]>;
  url: string;
  private dataStore: {
    asserts: Assert[]
  };
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
    this.dataStore = { asserts: [] };
    this._asserts = <BehaviorSubject<Assert[]>>new BehaviorSubject([]);
    this.asserts = this._asserts.asObservable();
  }

  addAssert(model): Observable<Assert> {
    return this.http.post<Assert>(`${this.url}api/assets`, model);
  }
  addAssertDataStore(model) {
    return this.http.post<Assert>(`${this.url}api/assets`, model).subscribe(data => {
      this.dataStore.asserts.push(data);
      this._asserts.next(Object.assign({}, this.dataStore).asserts);
    }, error => console.log('Could not add assets'));
  }

  getAsserts(): Observable<Assert[]> {
    return this.http.get<Assert[]>(`${this.url}api/assets`);
  }

  getAssertsDataStore() {
    this.http.get<Assert[]>(`${this.url}api/assets`).subscribe(data => {
      this.dataStore.asserts = data;
      this._asserts.next(Object.assign({}, this.dataStore).asserts);
    }, error => console.log('Could not load asserts.'));
  }

  getById(id: string) {
    this.http.get<Assert>(`${this.url}api/assets/${id}`)
      .subscribe(data => {
        let notFound = true;
        this.dataStore.asserts.forEach((item, index) => {
          if (item.assetId === data.assetId) {
            this.dataStore.asserts[index] = data;
            notFound = false;
          }
        });
        if (notFound) {
          this.dataStore.asserts.push(data);
        }
      }, error => console.log('Could not find assert.'));
  }

  updateAssert(model: Assert) {
    this.http.put<Assert>(`${this.url}api/assets/${model.assetId}`, JSON.stringify(model))
      .subscribe(data => {
        this.dataStore.asserts.forEach((item, index) => {
          if (item.assetId === data.assetId) { this.dataStore.asserts[index] = data; }
        });
        this._asserts.next(Object.assign({}, this.dataStore).asserts);
      }, error => console.log('Could not update assert'));
  }

}
