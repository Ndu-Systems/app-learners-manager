import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationModel } from 'src/app/_models';
import { NavigationService } from 'src/app/_services';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
  navigationModel: NavigationModel;

  constructor(
    private routeTo: Router,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
  }
  goToSignUp() {    
    this.navigationModel = {
      IsHome: false,
      NavUrl: '',
      Title: 'Home'
    };
    this.navigationService.updateNavigationState(this.navigationModel);
    this.routeTo.navigate(['/sign-up']);
  }
  escape() {
    this.routeTo.navigate(['']);
  }
}
