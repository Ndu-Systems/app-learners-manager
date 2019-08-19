import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Learner } from 'src/app/_models';
import { Router, ActivatedRoute } from '@angular/router';
import { LearnerService, ParentService } from 'src/app/_services';
import { map } from 'rxjs/operators';
import { Parent } from 'src/app/_models/parent.model';

@Component({
  selector: 'app-parent-details',
  templateUrl: './parent-details.component.html',
  styleUrls: ['./parent-details.component.scss']
})
export class ParentDetailsComponent implements OnInit {
  parent: Observable<Parent>;
  parentId = '';
  constructor(
    private routeTo: Router,
    private activatedRoute: ActivatedRoute,
    private parentService: ParentService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      this.parentId = p.id;
    });
    this.parent = this.parentService.parents.pipe(map(learners => learners.find(item => item.parentId === this.parentId)));
  }
  toParents() {
    this.routeTo.navigate([`dashboard/parents`]);
  }

}
