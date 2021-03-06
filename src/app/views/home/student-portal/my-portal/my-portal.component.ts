import { Component, OnInit } from '@angular/core';
import { ADD_PUBLIC_QUESTION_URL, GET_TESTS_URL, STATUS_PENDING_PAYMENTS, UPDATE_BILLING_URL } from 'src/app/_services/_shared';
import { ApiService, AccountService, NavigationService, DocumentsService } from 'src/app/_services';
import { User } from 'src/app/_models/user.model';
import { Subject } from 'src/app/_models/grade.model';
import { Studentsubject } from 'src/app/_models/studentsubject.model';
import { Router } from '@angular/router';
import { Topic, TopicContent } from 'src/app/_models/topic.model';
import { Tests } from 'src/app/_models/tests.model';
import { NavigationModel } from 'src/app/_models';
import { NAVIGATION } from 'src/app/_shared';
import { environment } from 'src/environments/environment';
import { StudentPortalService } from 'src/app/_services/student.portal.service';
import { PublicQuestion } from 'src/app/_models/public.question.model';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  modalHeading: any;
  error;

  publicQuestion: PublicQuestion;
  index: number;
  constructor(
    private apiServices: ApiService,
    private accountService: AccountService,
    private router: Router,
    private studentPortalService: StudentPortalService,
    private navigationService: NavigationService,
    private documentsService: DocumentsService,
    private _snackBar: MatSnackBar


  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    
    this.studentPortalService.getStudentSubjectList(this.user.UserId);
    
    this.studentsubjects = this.studentPortalService.currentStudentSubjectListValue;

    
    this.studentPortalService.studentSubjectListObservable.subscribe(data => {
      if (data) {
        this.studentsubjects = data;
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
    this.studentPortalService.updateStudentubjectState(this.studentsubject)
    this.router.navigate(['view-subject']);
  }
  openTests(studentsubject: Studentsubject) {
    this.studentPortalService.updateStudentubjectState(studentsubject)
    this.router.navigate(['view-tests']);
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
        this.apiServices.actionQuery(UPDATE_BILLING_URL, this.user.Billing[0]).subscribe(billing => {
          this.user.Billing[0] = billing;
        })
      });

    });

  }




  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });

  }

}
