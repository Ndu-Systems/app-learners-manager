import { Component, OnInit } from '@angular/core';
import { MatSnackBar, ThemePalette } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Grade, Subject } from 'src/app/_models/grade.model';
import { User } from 'src/app/_models/user.model';
import { AccountService, ApiService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';
import { ADD_STUDENT_SUBJECTS_URL, GET__GRADE_DETAILS_URL, STATUS_ACTIVE, STATUS_DELETED } from 'src/app/_services/_shared';

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
  user: User;
  grades: Grade[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private apiService: ApiService,
    private accountService: AccountService,
    private _snackBar: MatSnackBar

  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userId = r.id;
    });
  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.student = this.userService.currentUserValue;
    this.userService.getUser(this.userId);
    this.userService.userObservable.subscribe(data => {
      this.student = data;
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
    // this.apiService.get(`${GET__GRADE_DETAILS_URL}?GradeId=${this.student.GradeId}`).subscribe(data => {
    //   if (data && data.Subjects) {
    //     this.subjects = data.Subjects;
    //     this.subjects.map(subject => {
    //       if (this.student.Studentsubjects.find(x => x.SubjectId === subject.SubjectId
    //         && Number(x.StatusId) === STATUS_ACTIVE)) {
    //         subject.IsSelected = true;
    //       }
    //       return subject;
    //     });
    //   }
    // });
    if (this.user.Company) {
      const institution = this.user.Company.Institutions[0];
      if (institution.Grades) {
        // make sure that grades/years have subjects
        this.grades = institution.Grades.filter(x => x.Subjects.length > 0);
        this.subjects = [];
        const grade = this.grades.find(x => x.CompanyGradeId === this.student.GradeId);
        this.subjects = this.grades.find(x => x.GradeId === grade.GradeId).Subjects;
    
      } else {
        alert('He is dead jim')
      }
    }

  }
  select(subject: Subject) {
    subject.IsSelected = !subject.IsSelected;
  }
  saveAll() {
    const todatosave = [];
    this.subjects.forEach(sub => {
      let studentSubject = {
        Id: '',
        UserId: this.student.UserId,
        SubjectId: sub.SubjectId,
        CreateUserId: this.user.UserId,
        ModifyUserId: this.user.UserId,
        StatusId: STATUS_ACTIVE,
        IsSelected: sub.IsSelected
      }
      const existingStudentSubect = this.student.Studentsubjects.find(x => x.SubjectId === sub.SubjectId);
      if (existingStudentSubect) {
        studentSubject.Id = existingStudentSubect.Id;
      }
      if (!sub.IsSelected) {
        studentSubject.StatusId = STATUS_DELETED;
      }
      todatosave.push(studentSubject);
    });

    this.apiService.add(`${ADD_STUDENT_SUBJECTS_URL}`, todatosave).subscribe(data => {
      if (data) {
        this.userService.getUser(this.userId);
        this.closeModal();
        this.openSnackBar(`Subjects assigned/unassigned to ${this.student.Name}!`, 'Success!');

      }
    });
  }


  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 3000
    });

  }
}
