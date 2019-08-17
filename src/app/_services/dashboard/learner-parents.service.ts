import { Injectable } from '@angular/core';
import { LearnerParents } from 'src/app/_models';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LearnerParentsService {
  // tslint:disable-next-line: variable-name
  _learnersParentsSubject = new BehaviorSubject<LearnerParents[]>([]);
  learnerParents: Observable<LearnerParents[]>;
  url: string;
  private dataStore: {
    learnerParents: LearnerParents[]
  };

  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
    this.dataStore = { learnerParents: [] };
    this.learnerParents = this._learnersParentsSubject.asObservable();
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
      this._learnersParentsSubject.next(Object.assign({}, this.dataStore).learnerParents);
    }, error => console.log('could not load parents for learner'));
  }
}
