import { Component, OnInit, Input } from '@angular/core';
import { ParentService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { LearnerParents, Learner } from 'src/app/_models';
import { map } from 'rxjs/operators';
import { ParentLearnerService } from 'src/app/_services/dashboard/parent-learner.service';

@Component({
  selector: 'app-parent-learner',
  templateUrl: './parent-learner.component.html',
  styleUrls: ['./parent-learner.component.scss']
})
export class ParentLearnerComponent implements OnInit {

  @Input() parentId: string;
  learnerParents: Observable<LearnerParents>;
  learners: Learner[];
  constructor(
    private parentLearnerService: ParentLearnerService
  ) { }

  ngOnInit() {
    this.parentLearnerService.getLeraners(this.parentId);
    this.parentLearnerService.learners.subscribe(data => {
      this.learners = data;
     // alert(JSON.stringify(this.learners));
    });
  }

}
