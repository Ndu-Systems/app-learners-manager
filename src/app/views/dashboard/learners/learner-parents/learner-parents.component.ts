import { Component, OnInit, Input } from '@angular/core';
import { LearnerParents } from 'src/app/_models';
import { Observable } from 'rxjs';
import { LearnerParentsService } from 'src/app/_services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-learner-parents',
  templateUrl: './learner-parents.component.html',
  styleUrls: ['./learner-parents.component.scss']
})
export class LearnerParentsComponent implements OnInit {
  // inputs from parent learner-details
  @Input() learnerId: string;
  learnerParents: Observable<LearnerParents>;
  constructor(
    private learnerParentsService: LearnerParentsService
  ) { }

  ngOnInit() {
    this.getParentsForLearner();
  }

  getParentsForLearner() {
    this.learnerParents = this.learnerParentsService.learnerParents
      .pipe(map(learnerParents => learnerParents
        .find(item => item.learnerId === this.learnerId)));
    this.learnerParentsService.getParentsForLearner(this.learnerId);
  }
}
