import { Component, OnInit } from '@angular/core';
import { NavModel, NavigationModel } from 'src/app/_models';
import { User } from 'src/app/_models/user.model';
import { AccountService, NavigationService } from 'src/app/_services';
import { Router } from '@angular/router';
import { ADMIN, LEARNER, NAVIGATION } from 'src/app/_shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {
  user: User;
  user$: Observable<User>;
  showModal: boolean;
  navModel: NavigationModel = {
    NavUrl: '',
    Title: 'Login',
  }
  navItems: NavModel[] = [
    { key: 'Home', label: 'home', routerLink: '' },
    { key: 'Pricing', label: 'pricing', routerLink: '/pricing' },
    { key: 'Contact', label: 'contact', routerLink: '/contact-us' }
  ];

  accountNavItems: NavModel[] = [
    { key: 'SignIn', label: 'sign in', routerLink: '/sign-in' },
    { key: 'SignUp', label: 'Sign up for free', routerLink: '/sign-up', class: ['signUp'] }
  ];

  isLoggedIn: boolean;
  navigationModel: NavigationModel;
  navigationSubject: NavigationModel;

  constructor(
    private accountService: AccountService,
    private routeTo: Router,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.user$ = this.accountService.user
    this.user$.subscribe(data => {
      this.user = data;
    })
    if (this.user && this.user.Roles.find(x => x.RoleName === ADMIN)) {
      this.routeTo.navigate(['dashboard']);
    }

    if (this.user && this.user.Roles.find(x => x.RoleName === LEARNER)) {
      this.isLoggedIn = true;
    }
    this.checkCurrentNav();
  }
  signOut() {
    this.accountService.logout();
  }
  toggleMenu() {
    this.showModal = !this.showModal;
  }
  goBack() {
    this.navigationModel = {
      IsHome: true,
      NavUrl: '',
      Title: 'Home'
    };
    this.navigationService.updateNavigationState(this.navigationModel);
    this.navigationSubject = (JSON.parse(localStorage.getItem(NAVIGATION)));
    this.routeTo.navigate([this.navigationModel.NavUrl]);
  }
  checkCurrentNav() {
    this.navigationModel = {
      IsHome: true,
      NavUrl: '',
      Title: 'Home'
    };
    this.navigationService.updateNavigationState(this.navigationModel);
    this.navigationSubject = (JSON.parse(localStorage.getItem(NAVIGATION)));
  }

  updateNavigation(model: NavModel) {
    if (model.key !== 'Home') {
      this.navigationModel = {
        IsHome: false,
        NavUrl: '',
        Title: model.label
      };
    } else {
      this.navigationModel.IsHome = true;
      this.navigationModel.NavUrl = '',
        this.navigationModel.Title = model.label;
    }
    this.navigationService.updateNavigationState(this.navigationModel);
    this.navigationSubject = (JSON.parse(localStorage.getItem(NAVIGATION)));
  }
}
