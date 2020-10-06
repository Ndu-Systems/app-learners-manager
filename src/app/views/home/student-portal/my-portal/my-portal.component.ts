import { Component, OnInit } from '@angular/core';
import { GET_SUBJECTS_FOR_A_GRADE_URL, GET_STUDENT_SUBJECTS_URL, GET_TESTS_URL, STATUS_PENDING_PAYMENTS, UPDATE_BILLING_URL } from 'src/app/_services/_shared';
import { ApiService, AccountService, NavigationService, DocumentsService } from 'src/app/_services';
import { User } from 'src/app/_models/user.model';
import { Subject } from 'src/app/_models/grade.model';
import { Studentsubject } from 'src/app/_models/studentsubject.model';
import { Router } from '@angular/router';
import { PortalService } from 'src/app/_services/portal.service';
import { Topic, TopicContent } from 'src/app/_models/topic.model';
import { Tests } from 'src/app/_models/tests.model';
import { NavigationModel } from 'src/app/_models';
import { NAVIGATION } from 'src/app/_shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-portal',
  templateUrl: './my-portal.component.html',
  styleUrls: ['./my-portal.component.scss']
})
export class MyPortalComponent implements OnInit {
  GradeId: any;
  grade: any;
  subjects: Subject[];
  data: any;
  user: User;
  studentsubjects: Studentsubject[];
  topics: Topic[];
  selectedIndex = 0;
  tests: any;
  subject: Subject;
  studentsubject: Studentsubject;
  navigationModel: NavigationModel;
  navigationSubject: NavigationModel;
  showModal: boolean;
  showLocked: boolean;


  constructor(
    private apiServices: ApiService,
    private accountService: AccountService,
    private router: Router,
    private portalService: PortalService,
    private navigationService: NavigationService,
    private documentsService: DocumentsService,

  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.apiServices.get(`${GET_STUDENT_SUBJECTS_URL}?UserId=${this.user.UserId}`).subscribe(data => {
      if (data) {
        this.studentsubjects = data;
        this.studentsubjects.map(x => x.Subject.Class = ['tab']);
        this.studentsubjects[this.selectedIndex].Subject.Class = ['tab', 'active'];
        this.topics = this.studentsubjects[this.selectedIndex].Subject.Topics;
        this.studentsubject = this.studentsubjects[this.selectedIndex];
        this.subject = this.studentsubjects[this.selectedIndex].Subject;
        this.loadTests(this.studentsubjects[this.selectedIndex].Subject.SubjectId);
      }
    });

    this.checkUserStatus();
  }

  checkUserStatus() {
    if (Number(this.user.StatusId) === STATUS_PENDING_PAYMENTS) {
      this.showModal = true;
      this.showLocked = true;
    }
  }

  loadTests(subjectId) {
    this.apiServices.get(`${GET_TESTS_URL}?SubjectId=${subjectId}`).subscribe(data => {
      if (data) {
        this.tests = data.Tests;
      }
    });
  }

  viewSubject() {
    this.portalService.updateStudentubjectState(this.studentsubject)
    this.router.navigate(['view-subject']);
  }
  openTests(studentsubject: Studentsubject) {
    this.portalService.updateStudentubjectState(studentsubject)
    this.router.navigate(['view-tests']);
  }


  readTopic(content: TopicContent) {
    this.portalService.updateTopicContentState(content);
    this.router.navigate(['read-topic']);
  }

  selectSubject(index) {
    this.selectedIndex = index;
    this.studentsubjects.map(x => x.Subject.Class = ['tab']);
    this.studentsubjects[this.selectedIndex].Subject.Class = ['tab', 'active'];
    this.topics = this.studentsubjects[this.selectedIndex].Subject.Topics;
    this.studentsubject = this.studentsubjects[this.selectedIndex];
    this.subject = this.studentsubjects[this.selectedIndex].Subject;
    this.loadTests(this.studentsubjects[this.selectedIndex].Subject.SubjectId);
  }

  takeTest(test: Tests) {
    this.portalService.updateTestState(test);
    this.router.navigate(['take-test']);

  }

  signOut() {
    this.goBack();
    this.accountService.logout();
  }

  goBack() {
    this.navigationModel = {
      IsHome: true,
      NavUrl: '',
      Title: 'Home'
    };
    this.navigationService.updateNavigationState(this.navigationModel);
    this.navigationSubject = (JSON.parse(localStorage.getItem(NAVIGATION)));
  }

  imageChanged(event) {
    const files = event.target.files;
    this.uplaodFile(files);
  }


  uplaodFile(files: FileList) {
    if (!files.length) {
      return false;
    }

    Array.from(files).forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `tybo.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.documentsService.uploadFile(formData).subscribe(url => {
        const pp = `${environment.API_URL}/api/upload/${url}`;
        this.user.Billing[0].PayProof = pp;
        this.apiServices.add(UPDATE_BILLING_URL, this.user.Billing[0]).subscribe(billing => {
          this.user.Billing[0] = billing;
        })
      });

    });

  }

}
