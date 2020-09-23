import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOC_LEARNERS } from './_shared';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private leanersBehaviorSubject: BehaviorSubject<User[]>;
  public leanersObservable: Observable<User[]>;



  constructor(
  ) {
    this.leanersBehaviorSubject = new BehaviorSubject<User[]>(JSON.parse(localStorage.getItem(LOC_LEARNERS)));
    this.leanersObservable = this.leanersBehaviorSubject.asObservable();
  }


  public get getCurrentLearners(): User[] {
    return this.leanersBehaviorSubject.value;
  }

  updateLearnersState(users: User[]) {
    this.leanersBehaviorSubject.next(users);
    localStorage.setItem(LOC_LEARNERS, JSON.stringify(users));
  }


}
