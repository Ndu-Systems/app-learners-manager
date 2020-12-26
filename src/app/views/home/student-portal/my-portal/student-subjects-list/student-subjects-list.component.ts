import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/_models/assignment.model';
import { Studentsubject } from 'src/app/_models/studentsubject.model';
import { Tests } from 'src/app/_models/tests.model';
import { TopicContent } from 'src/app/_models/topic.model';
import { StudentPortalService } from 'src/app/_services/student.portal.service';

@Component({
  selector: 'app-student-subjects-list',
  templateUrl: './student-subjects-list.component.html',
  styleUrls: ['./student-subjects-list.component.scss']
})
export class StudentSubjectsListComponent implements OnInit {
  @Input() subjects: Studentsubject[];
  studentsubject: Studentsubject;
  subjectId: string;
  selectedIndex: number;
  constructor(
    private router: Router,
    private studentPortalService: StudentPortalService,

  ) { }

  ngOnInit() {
    const currentSelectedSubject = this.studentPortalService.getCurrentSelectedStudentsubject;
    if (this.subjects && this.subjects.length) {
      if (currentSelectedSubject && currentSelectedSubject.Id) {
        this.studentsubject = currentSelectedSubject;
      } else {
        this.studentsubject = this.subjects[0];
      }
      this.subjectId = this.studentsubject.SubjectId;

    }

  }
  subjectChanged(subjectId: string) {
    const subject = this.subjects.find(x => x.SubjectId === subjectId);
    this.studentsubject = subject;
    this.studentPortalService.updateCurrentSelectedStudentsubject(subject);
  }


  readTopic(content: TopicContent) {
    this.studentPortalService.updateTopicContentState(content);
    this.router.navigate(['read-topic']);
  }

  takeTest(test: Tests) {
    this.studentPortalService.updateTestState(test);
    this.router.navigate(['take-test']);

  }

  viewAssignments(assignment: Assignment) {
    this.studentPortalService.updateAssignmentState(assignment);
    this.router.navigate(['student-assignment']);
  }
  onTabChanged(event: MatTabChangeEvent) {
    console.log(event.index);

  }

}
