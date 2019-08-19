import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Learner } from 'src/app/_models';
import { Router, ActivatedRoute } from '@angular/router';
import { LearnerService, ParentService } from 'src/app/_services';

@Component({
  selector: 'app-link-learner-to-parent',
  templateUrl: './link-learner-to-parent.component.html',
  styleUrls: ['./link-learner-to-parent.component.scss']
})
export class LinkLearnerToParentComponent implements OnInit {

  learners: Observable<Learner[]>;
  parentId: string;
  constructor(
    private routeTo: Router,
    private learnerService: LearnerService,
    private activatedRoute: ActivatedRoute,
    private parentService: ParentService

  ) {
    this.activatedRoute.params.subscribe(p => {
      this.parentId = p.id;
    });
  }

  ngOnInit() {
    this.learnerService.getAll();
    this.learners = this.learnerService.learners;
  }
  link(id: string) {
    this.parentService.addLearnerForParent(this.parentId, id)
    .subscribe(data => {
      this.routeTo.navigate([`dashboard/parents/${this.parentId}`]);
    }, error => {
      console.log(`Error details: ${error}`);
    });
  }
}
