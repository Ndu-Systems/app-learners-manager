import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'src/app/_models/grade.model';
import { User } from 'src/app/_models/user.model';
import { AccountService, ApiService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';
import { ADD_STUDENT_SUBJECTS_URL, GET__GRADE_DETAILS_URL } from 'src/app/_services/_shared';

@Component({
  selector: 'app-view-learner',
  templateUrl: './view-learner.component.html',
  styleUrls: ['./view-learner.component.scss']
})
export class ViewLearnerComponent implements OnInit {
  student: User;
  userId: string;
  showModal: boolean;
  modalHeading: string;
  subjects: Subject[] = [];
  color: ThemePalette = 'primary';
  user: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private apiService: ApiService,
    private accountService: AccountService,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userId = r.id;
    });
  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.student = this.userService.currentUserValue;
    this.userService.getUser(this.userId);
    this.userService.userObservable.subscribe(user => {
      this.student = user;
      this.loadSubjects();
    });
  }

  back() {
    this.router.navigate([`dashboard/learners`])
  }
  add() {
    this.showModal = true;
    this.modalHeading = `Assign Subjects to  ${this.student && this.student.Name}`;
  }
  closeModal() {
    this.showModal = false;
  }
  loadSubjects() {
    this.apiService.get(`${GET__GRADE_DETAILS_URL}?GradeId=${this.student.GradeId}`).subscribe(data => {
      if (data && data.Subjects) {
        this.subjects = data.Subjects;
        this.subjects.map(subject => {
          if (this.student.Studentsubjects.find(x => x.SubjectId === subject.SubjectId)) {
            subject.IsSelected = true;
          }
          return subject;
        });
      }
    });

  }
  select(subject: Subject) {
    subject.IsSelected = !subject.IsSelected;
  }
  saveAll() {
    console.log(this.subjects);
    const todatosave = [];
    this.subjects.forEach(sub => {
      todatosave.push({
        UserId: this.student.UserId,
        SubjectId: sub.SubjectId,
        CreateUserId: this.user.UserId,
        ModifyUserId: this.user.UserId,
        StatusId: 1,
        IsSelected: sub.IsSelected
      });
    });

    this.apiService.add(`${ADD_STUDENT_SUBJECTS_URL}`,todatosave).subscribe(data => {
      if (data) {
        console.log(data);
      }
    });
  }
}
