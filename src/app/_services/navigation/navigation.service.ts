import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationModel } from 'src/app/_models';
import { NAVIGATION } from 'src/app/_shared';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigationBehaviorSubject: BehaviorSubject<NavigationModel>;
  public navigationObservable: Observable<NavigationModel>;
  constructor() {
    this.navigationBehaviorSubject = new BehaviorSubject<NavigationModel>(JSON.parse(localStorage.getItem(NAVIGATION)) || null);
    this.navigationObservable = this.navigationBehaviorSubject.asObservable();
  }

  updateNavigationState(model: NavigationModel) {
    this.navigationBehaviorSubject.next(model);
    localStorage.setItem(NAVIGATION, JSON.stringify(model));
  }

  public get currentNavValue(): NavigationModel {
    return this.navigationBehaviorSubject.value;
  }
}
