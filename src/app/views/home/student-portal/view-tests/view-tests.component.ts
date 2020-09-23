import { Component, OnInit } from '@angular/core';
import { Tests } from 'src/app/_models/tests.model';
import { Studentsubject } from 'src/app/_models/studentsubject.model';
import { PortalService } from 'src/app/_services/portal.service';
import { Router } from '@angular/router';
import { TopicContent } from 'src/app/_models/topic.model';
import { Subject } from 'src/app/_models/grade.model';
import { ApiService } from 'src/app/_services';
import { GET_TESTS_URL } from 'src/app/_services/_shared';

@Component({
  selector: 'app-view-tests',
  templateUrl: './view-tests.component.html',
  styleUrls: ['./view-tests.component.scss']
})
export class ViewTestsComponent implements OnInit {
  test: Tests;
  tests: Tests[];
  subject: Subject;

  studentsubject: Studentsubject;

  constructor(
    private portalService: PortalService,
    private router: Router,
    private apiServices: ApiService,
  ) { }

  ngOnInit() {
    this.studentsubject = this.portalService.getCurrentStudentsubject;
    if (this.studentsubject) {
      this.subject = this.studentsubject.Subject;
      this.apiServices.get(`${GET_TESTS_URL}?SubjectId=${this.subject.SubjectId}`).subscribe(data => {
        if (data) {
          this.tests = data.Tests;
        }
      });
    }
    console.log(this.studentsubject);

  }



}
