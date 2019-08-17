import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LearnerService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { Learner, LearnerParents } from 'src/app/_models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-learner-details',
  templateUrl: './learner-details.component.html',
  styleUrls: ['./learner-details.component.scss']
})
export class LearnerDetailsComponent implements OnInit {
  learner: Observable<Learner>;
  learnerId = '';
  constructor(
    private routeTo: Router,
    private activatedRoute: ActivatedRoute,
    private learnerService: LearnerService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      this.learnerId = p.id;
    });
    // query from data store
    this.learner = this.learnerService.learners.pipe(map(learners => learners.find(item => item.learnerId === this.learnerId)));
    // get and load to data store
    this.learnerService.getById(this.learnerId);
  }
  toLearners() {
    this.routeTo.navigate([`dashboard/learners`]);
  }
}
