import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Parent } from 'src/app/_models/parent.model';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private _parents = new BehaviorSubject<Parent[]>([]);
  parents: Observable<Parent[]>;
  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
    this.parents = this._parents.asObservable();
  }
  getState() {
    return this._parents.value;
  }

  appendState(value) {
    const state = this.getState();
    state.push(value);
    this._parents.next(state);
  }
  updateState(values) {
    this._parents.next(values);
  }

  modifyState(value) {
    const state = this.getState();
    const index = state.findIndex(x => x.parentId === value.parent);
    if (index < 0) { return false; }
    state[index] = value;
    state.push(value);
    this._parents.next(state);
  }
  // HTTP
  addParent(model) {
    this.http.post<any>(`${this.url}api/parents`, model).subscribe(data => {
      this.appendState(data);
    }, error => {
      console.log(`Error source: ${this.url}api/parents`);
      console.log(`Error details: ${error}`);
    });
  }
  getParents() {
    this.http.get<any>(`${this.url}api/parents`).subscribe(data => {
      this.updateState(data);
    }, error => {
      console.log(`Error source: ${this.url}api/parents`);
      console.log(`Error details: ${error}`);
    });
  }

}
