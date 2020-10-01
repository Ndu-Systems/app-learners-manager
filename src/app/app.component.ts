import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './_services';
import { Router } from '@angular/router';
import { ADMIN, LEARNER } from './_shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private routeTo: Router,
    ) {

  }
  ngOnInit(): void {
    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }

    if (this.accountService.currentUserValue) {
      let user = this.accountService.currentUserValue;
      if (user.Roles.find(x => x.RoleName === ADMIN)) {
        // this.routeTo.navigate(['dashboard']);
      }

      if (user.Roles.find(x => x.RoleName === LEARNER)) {
        // this.routeTo.navigate(['/my-portal']);
      }
    }
  }
}
