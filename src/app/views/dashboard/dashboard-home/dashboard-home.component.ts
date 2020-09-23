import { Component, OnInit } from '@angular/core';
import { BreadCrumbModel, HeaderBannerModel, GetQueryModel, StatisticModel } from 'src/app/_models';
import { StatisticsService, ApiService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { GETS_STAT_URL, GET_STUDENTS_URL } from 'src/app/_services/_shared';
import { User } from 'src/app/_models/user.model';
import { StateService } from 'src/app/_services/state.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  statistics: StatisticModel[] = [
    { Title: 'Leaners who needs to pay', Value: 0, Description: 'Pending payments' },
    { Title: 'Paid and have access', Value: 0, Description: 'Active leaners' },
    { Title: 'Needs to confirm email', Value: 0, Description: 'Pending Email Verification' },
    { Title: 'grades we we covering', Value: 0, Description: 'Active grades' }
  ];
  crumbs: BreadCrumbModel[] = [
    {
      Label: 'dashboard',
      Link: '/dashboard'
    }
  ];

  headerBanner: HeaderBannerModel = {
    Header: 'Dashboard',
    SubHeader: 'All your system statistics.'
  };
  stat: any;
  leaners: User[];
  constructor(
    private apiServices: ApiService,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.apiServices.get(GETS_STAT_URL).subscribe(data => {
      if (data && data.PendingPayments) {
        this.stat = data;
        this.statistics[0].Value = data.PendingPayments;
        this.statistics[1].Value = data.ActiveUsers;
        this.statistics[2].Value = data.PendingEmailVerification;
        this.statistics[3].Value = data.activeGrades;
      }
    });

    this.apiServices.get(GET_STUDENTS_URL).subscribe(data => {
      if (data && data.length) {
        this.stateService.updateLearnersState(data);
        this.leaners = data;
        this.leaners = this.leaners.filter(x => Number(x.StatusId) === 5);

      }
    });
  }
  add() { }
}
