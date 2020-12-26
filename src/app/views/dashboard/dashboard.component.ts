import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavigationService } from 'src/app/_services';
import { NavigationModel } from 'src/app/_models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;
  navigationSubjectObservable$: Observable<NavigationModel>;
  navigationSubject: NavigationModel;
  className = 'main-container grid';
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private navigationService: NavigationService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.navigationSubjectObservable$ = this.navigationService.navigationObservable;
    this.navigationSubjectObservable$.subscribe(data => this.navigationSubject = data);
    if (!this.navigationSubject.IsDashboard) {
      this.className = 'main-container';
    } else {
      this.className = 'main-container grid';
    }
  }

}
