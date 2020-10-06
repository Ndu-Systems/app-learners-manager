import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StatisticModel, GetQueryModel } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';
import { STATISTICS } from 'src/app/_shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private statisticsBehaviorSubject: BehaviorSubject<StatisticModel[]>;
  public statisticsObservable: Observable<StatisticModel[]>;
  url: string;

  private dataStore: {
    statistics: StatisticModel[]
  } = { statistics: [] };

  constructor(
    private http: HttpClient,
  ) {
    this.statisticsBehaviorSubject = new BehaviorSubject<StatisticModel[]>(JSON.parse(localStorage.getItem(STATISTICS)) || []);
    this.statisticsObservable = this.statisticsBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  updateState(model: StatisticModel[]) {
    localStorage.setItem(STATISTICS, JSON.stringify(model));
  }

}
