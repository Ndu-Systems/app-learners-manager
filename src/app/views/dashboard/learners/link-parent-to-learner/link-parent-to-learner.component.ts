import { Component, OnInit } from '@angular/core';
import { ParentService, LearnerParentsService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-link-parent-to-learner',
  templateUrl: './link-parent-to-learner.component.html',
  styleUrls: ['./link-parent-to-learner.component.scss']
})
export class LinkParentToLearnerComponent implements OnInit {

  parents;
  learnerId: string;
  constructor(
    private parentService: ParentService,
    private learnerParentsService: LearnerParentsService,
    private routeTo: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(p => {
      this.learnerId = p.id;
    });
  }
  ngOnInit() {
    this.parentService.parents.subscribe(data => {
      this.parents = data;
    });
  }
  link(id: string) {
    this.learnerParentsService.addParentForLearner(this.learnerId, id)
    .subscribe(data => {
      this.routeTo.navigate([`dashboard/learners/${this.learnerId}`]);
    }, error => {
      console.log(`Error details: ${error}`);
    });
  }
}
