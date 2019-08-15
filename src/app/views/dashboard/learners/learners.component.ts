import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Learner } from 'src/app/_models';
import { LearnerService } from 'src/app/_services';

@Component({
  selector: 'app-learners',
  templateUrl: './learners.component.html',
  styleUrls: ['./learners.component.scss']
})
export class LearnersComponent implements OnInit {
  learners: Observable<Learner[]>;
  constructor(
    private learnerService: LearnerService
  ) { }

  ngOnInit() {
    this.learners = this.learnerService.learners;
    this.learnerService.getAll();
  }

}
