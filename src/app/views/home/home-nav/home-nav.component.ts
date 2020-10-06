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
  constructor(private routeTo: Router,
    ) {
  }



  ngOnInit() {
  }


  goto(route) {
    this.routeTo.navigate([route]);
  }
}
