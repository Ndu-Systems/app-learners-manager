import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Learner } from 'src/app/_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LearnerService {
  // tslint:disable-next-line: variable-name
  private _learnersSubject = new BehaviorSubject<Learner[]>([]);
  learners: Observable<Learner[]>;
  url: string;
  private dataStore: {
    learners: Learner[]
  };

  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
    this.dataStore = { learners: [] };
    this.learners = this._learnersSubject.asObservable();
  }

  getAll() {
    this.http.get<Learner[]>(`${this.url}api/learners`).subscribe(data => {
      this.dataStore.learners = data;
      this._learnersSubject.next(Object.assign({}, this.dataStore).learners);
    }, error => console.log('could not load learners'));
  }
}
