import { Component, OnInit } from '@angular/core';
import { Studentsubject } from 'src/app/_models/studentsubject.model';
import { Router } from '@angular/router';
import { Topic, TopicContent } from 'src/app/_models/topic.model';
import { StudentPortalService } from 'src/app/_services/student.portal.service';

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.scss']
})
export class ViewSubjectComponent implements OnInit {
  studentsubject: Studentsubject;

  constructor(
    private portalService: StudentPortalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.studentsubject = this.portalService.getCurrentStudentsubject;
  }

  readTopic(content: TopicContent) {
    this.portalService.updateTopicContentState(content);
    this.router.navigate(['read-topic']);
  }

  add(){}
}
