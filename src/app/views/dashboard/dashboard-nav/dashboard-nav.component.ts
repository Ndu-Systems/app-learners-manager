import { Component, OnInit } from '@angular/core';
import { AccountService, NavigationService } from 'src/app/_services';
import { NavModel, NavigationModel } from 'src/app/_models';
import { User } from 'src/app/_models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ADMIN, NAVIGATION, TEACHER } from 'src/app/_shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {
  navItems: NavModel[] = [];
  showModal: boolean;
  user: User;
  user$: Observable<User>;
  navigationModel: NavigationModel;
  navigationSubjectObservable$: Observable<NavigationModel>;
  navigationSubject: NavigationModel;
  constructor(
    private accountService: AccountService,
    private navigationService: NavigationService,
    private routerTo: Router
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.user$ = this.accountService.user
    this.user$.subscribe(data => {
      this.user = data;
    });
    this.navigationSubjectObservable$ = this.navigationService.navigationObservable;    
    this.navigationSubjectObservable$.subscribe(data => this.navigationSubject = data);
  
     
    if (this.user.UserType === ADMIN) {
      this.setAdminRoute();
    }
    if (this.user.UserType === TEACHER) {
      this.setTeacherRoute();
    }
  }
  logout() {
    this.accountService.logout();
  }
  toggleMenu() {
    this.showModal = !this.showModal;
  }

  goBack() {
    // this.navigationSubject.IsDashboard = true;
    this.routerTo.navigate(['dashboard/grades']);
  }

  updateNavigation(model: NavModel) {
    if (model.key !== 'Dashboard') {
      this.navigationModel = {
        IsDashboard: false,
        NavUrl: '',
        Title: model.label
      };
    } else {
      this.navigationModel.IsDashboard = true;
      this.navigationModel.NavUrl = 'dashboard/grades',
        this.navigationModel.Title = model.label;
    }
    this.navigationService.updateNavigationState(this.navigationModel);
    // this.navigationSubject = (JSON.parse(localStorage.getItem(NAVIGATION)));
  }

  setAdminRoute() {
    this.navItems = [
      {
        key: 'Grades',
        label: 'Grades',
        routerLink: '/dashboard/grades',
      },
      {
        key: 'Learners',
        label: 'Learners',
        routerLink: '/dashboard/learners',
      },
      {
        key: 'Teachers',
        label: 'Teachers',
        routerLink: '/dashboard/teachers',
      },
      {
        key: 'Company',
        label: 'Organization',
        routerLink: '/dashboard/company',
      },

      // {
      //   key: 'Insights',
      //   label: 'Insights',
      //   routerLink: '/dashboard',
      // }
    ];
  }
  setTeacherRoute() {
    this.navItems = [
      {
        key: 'Grades',
        label: 'Grades',
        routerLink: '/dashboard/grades',
      }
    ];
  }
}
