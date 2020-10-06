import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavModel } from 'src/app/_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  navItems: NavModel[] = [
    { label: 'home', routerLink: '' },
    { label: 'pricing', routerLink: '/pricing' },
    { label: 'contact', routerLink: '/contact-us' },
    { label: 'sign in', routerLink: '/sign-in' },
    { label: 'Sign up for free', routerLink: '/sign-up', class: ['signUp'] }
  ]
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,     private routeTo: Router,
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }


  goto(route) {
    this.routeTo.navigate([route]);
  }

}

 
