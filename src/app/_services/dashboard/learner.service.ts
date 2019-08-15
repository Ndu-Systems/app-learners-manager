import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Learner, LearnerParents } from 'src/app/_models';
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
    learners: Learner[],
    learnerParents: LearnerParents[]
  };

  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
    this.dataStore = { learners: [], learnerParents: [] };
    this.learners = this._learnersSubject.asObservable();
  }

  getAll() {
    this.http.get<Learner[]>(`${this.url}api/learners`).subscribe(data => {
      this.dataStore.learners = data;
      this._learnersSubject.next(Object.assign({}, this.dataStore).learners);
    }, error => console.log('could not load learners'));
  }

  getById(id: string) {
    this.http.get<Learner>(`${this.url}api/learners/${id}`).subscribe(data => {
      let notfound = true;
      this.dataStore.learners.forEach((item, index) => {
        if (item.learnerId === data.learnerId) {
          this.dataStore.learners[index] = data;
          notfound = false;
        }
      });
      if (notfound) {
        this.dataStore.learners.push(data);
      }
      this._learnersSubject.next(Object.assign({}, this.dataStore).learners);
    }, error => console.log('could not load learner'));
  }

  getParentsForLearner(id: string) {
    this.http.get<LearnerParents>(`${this.url}api/learners/${id}/parents`).subscribe(data => {
      let notfound = true;
      this.dataStore.learnerParents.forEach((item, index) => {
        if (item.learnerId === data.learnerId) {
          this.dataStore.learnerParents[index] = data;
          notfound = false;
        }
      });
      if (notfound) {
        this.dataStore.learnerParents.push(data);
      }
      this._learnersSubject.next(Object.assign({}, this.dataStore).learnerParents);
    }, error => console.log('could not load parents for learner'));
  }


}
