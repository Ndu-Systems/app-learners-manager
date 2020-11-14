import { Component, Input, OnInit } from '@angular/core';
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
  navigationSubject: NavigationModel;
  navigationModel: NavigationModel;
  @Input() showNav: boolean;
  constructor(private routeTo: Router,
    private navigationService: NavigationService,

  ) {
  }



  ngOnInit() {
    this.navigationModel = {
      IsHome: true,
      NavUrl: '',
      Title: ''
    };
    this.navigationService.updateNavigationState(this.navigationModel);
    this.navigationSubject = (JSON.parse(localStorage.getItem(NAVIGATION)));
  }


  goto(route) {
    if (route !== '') {
      this.navigationModel = {
        IsHome: false,
        NavUrl: route,
        Title: route
      };
    } else {
      this.navigationModel = {
        IsHome: true,
        NavUrl: '',
        Title: ''
      };
    }
    this.navigationService.updateNavigationState(this.navigationModel);
    this.navigationSubject = (JSON.parse(localStorage.getItem(NAVIGATION)));
    this.routeTo.navigate([route]);
  }

}
