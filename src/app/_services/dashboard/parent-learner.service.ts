import { Injectable } from '@angular/core';
import { Learner } from 'src/app/_models';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentLearnerService {

  private _learners = new BehaviorSubject<Learner[]>([]);
  learners: Observable<Learner[]>;
  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
    this.learners = this._learners.asObservable();
  }
  getState() {
    return this._learners.value;
  }

  appendState(value) {
    const state = this.getState();
    state.push(value);
    this._learners.next(state);
  }
  updateState(values) {
    this._learners.next(values);
  }

  modifyState(value: Learner) {
    const state = this.getState();
    const index = state.findIndex(x => x.learnerId === value.learnerId);
    if (index < 0) { return false; }
    state[index] = value;
    state.push(value);
    this._learners.next(state);
  }
  // HTTP
  addLearner(model) {
    this.http.post<any>(`${this.url}api/parents`, model).subscribe(data => {
      this.appendState(data);
    }, error => {
      console.log(`Error source: ${this.url}api/parents`);
      console.log(`Error details: ${error}`);
    });
  }
  getLeraners(parentId) {
    this.http.get<any>(`${this.url}api/parents/${parentId}/learners`).subscribe(data => {
      this.updateState(data);
    }, error => {
      console.log(`Error source: ${this.url}api/parents`);
      console.log(`Error details: ${error}`);
    });
  }

}
