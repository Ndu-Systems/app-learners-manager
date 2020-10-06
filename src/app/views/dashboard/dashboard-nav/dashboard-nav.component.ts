import { Component, OnInit } from '@angular/core';
import { AccountService, NavigationService } from 'src/app/_services';
import { NavModel, NavigationModel } from 'src/app/_models';
import { User } from 'src/app/_models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { NAVIGATION } from 'src/app/_shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {
  navItems: NavModel[] = [

    {
      key: 'Grades',
      label: 'Grades',
      routerLink: '/dashboard/grades',
      imgActive: 'assets/images/dashboard/nav/grades.svg',
      imgDisabled: 'assets/images/dashboard/nav/grades-disabled.svg',
      imgMobile: 'assets/images/dashboard/nav/grades-mobile.svg',
      imgMobileDisabled: 'assets/images/dashboard/nav/grades-mobile-disabled.svg'
    },
    {
      label: 'Learners',
      routerLink: '/dashboard/learners',
      imgActive: 'assets/images/dashboard/nav/learners.svg',
      imgDisabled: 'assets/images/dashboard/nav/learners-disabled.svg',
      imgMobile: 'assets/images/dashboard/nav/learners-mobile.svg',
      imgMobileDisabled: 'assets/images/dashboard/nav/learners-mobile-disabled.svg'
    },
    {
      label: 'Teachers',
      routerLink: '/dashboard/teachers',
      imgActive: 'assets/images/dashboard/nav/learners.svg',
      imgDisabled: 'assets/images/dashboard/nav/learners-disabled.svg',
      imgMobile: 'assets/images/dashboard/nav/learners-mobile.svg',
      imgMobileDisabled: 'assets/images/dashboard/nav/learners-mobile-disabled.svg'
    },

    {
      key: 'Insights',
      label: 'Insights',
      routerLink: '/dashboard',
      imgActive: 'assets/images/dashboard/nav/dashboard.svg',
      imgDisabled: 'assets/images/dashboard/nav/dashboard-disabled.svg',
      imgMobile: 'assets/images/dashboard/nav/home-mobile.svg',
      imgMobileDisabled: 'assets/images/dashboard/nav/home-mobile-disabled.svg'
    }
    // {
    //   label: 'Admin portal',
    //   routerLink: '/admin', 
    //   imgActive: 'assets/images/dashboard/nav/admins.svg',
    //   imgDisabled:'assets/images/dashboard/nav/admins-disabled.svg',
    //   imgMobile:'assets/images/dashboard/nav/admins-mobile.svg',
    //   imgMobileDisabled:'assets/images/dashboard/nav/admins-mobile-disabled.svg',
    // },
  ];
  showModal: boolean;
  user: User;
  user$: Observable<User>;
  navigationModel: NavigationModel;
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
    this.navigationModel = {
      IsDashboard: true,
      NavUrl: '',
      Title: 'Dashboard'
    };

    this.navigationService.updateNavigationState(this.navigationModel);
    this.navigationSubject = (JSON.parse(localStorage.getItem(NAVIGATION)));
  }
  logout() {
    this.accountService.logout();
  }
  toggleMenu() {
    this.showModal = !this.showModal;
  }

  goBack() {
    this.routerTo.navigate([this.navigationModel.NavUrl]);
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
      this.navigationModel.NavUrl = '',
        this.navigationModel.Title = model.label;
    }
    this.navigationService.updateNavigationState(this.navigationModel);
    this.navigationSubject = (JSON.parse(localStorage.getItem(NAVIGATION)));

  }
}
