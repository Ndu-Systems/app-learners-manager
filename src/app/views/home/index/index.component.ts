import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationModel } from 'src/app/_models';
import { NavigationService } from 'src/app/_services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  navigationModel: NavigationModel;
  showLoader: boolean = false;

  constructor(
    private routeTo: Router,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.navigationModel = {
      IsHome: true,
      NavUrl: '',
      Title: 'Home'
    };
  
    this.navigationService.updateNavigationState(this.navigationModel);
    this.spinner();
  }
  spinner() {
    this.showLoader = true;  
    setTimeout(() => {
      this.showLoader = false;   
    }, 1500);
  }
  getStarted() {

    this.navigationModel = {
      IsHome: false,
      NavUrl: '',
      Title: 'Home'
    };
    this.navigationService.updateNavigationState(this.navigationModel);
    this.routeTo.navigate(['before-start']);
  }

}
