import { Component, OnInit } from '@angular/core';
import { AssertService } from 'src/app/_services/dashboard/assert.service';
import { Observable } from 'rxjs';
import { Assert } from 'src/app/_models';
import { ParentService, LearnerService, SmsService } from 'src/app/_services';
import { Router } from '@angular/router';
import { CommunicationComponent } from '../communication';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  asserts: Observable<Assert[]>;
  countAsserts = 0;
  countParents = 0;
  countLearners = 0;
  countMessages = 0;
  parents = 'parents';
  learners = 'learners';
  constructor(
    private routTo: Router,
    private assertService: AssertService,
    private parentService: ParentService,
    private learnerService: LearnerService,
    private smsService: SmsService,
  ) { }

  ngOnInit() {
    this.asserts = this.assertService.asserts;
    this.assertService.getAssertsDataStore();

    this.assertService.asserts.subscribe(data => {
      this.countAsserts = data.length;
    });
    this.parentService.parents.subscribe(data => {
      this.countParents = data.length;
    });
    this.learnerService.learners.subscribe(data => {
      this.countLearners = data.length;
    });
    this.learnerService.getAll();
  }
  navigateToPage(url: string) {
    this.routTo.navigate([`dashboard/${url}`]);
  }
}
