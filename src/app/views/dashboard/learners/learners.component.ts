import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Learner } from 'src/app/_models';
import { LearnerService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learners',
  templateUrl: './learners.component.html',
  styleUrls: ['./learners.component.scss']
})
export class LearnersComponent implements OnInit {
  learners: Observable<Learner[]>;
  constructor(
    private routeTo: Router,
    private learnerService: LearnerService
  ) { }

  ngOnInit() {
    this.learnerService.getAll();
    this.learners = this.learnerService.learners;
  }

  viewLearnerDetails(id: string) {
     this.routeTo.navigate([`dashboard/learners/${id}`]);
  }

}
