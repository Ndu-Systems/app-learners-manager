import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade, Subject, Teachersubject } from 'src/app/_models/grade.model';
import { TeacherSubject } from 'src/app/_models/teacher.grade.subject ';
import { User } from 'src/app/_models/user.model';
import { AccountService, ApiService } from 'src/app/_services';
import { GradeService } from 'src/app/_services/grade.service';
import { UserService } from 'src/app/_services/user.service';
import { ADD_TEACHER_SUBJECTS_URL, STATUS_ACTIVE, STATUS_DELETED } from 'src/app/_services/_shared';

@Component({
  selector: 'app-view-teachers',
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.scss']
})
export class ViewTeachersComponent implements OnInit {

  teacher: User;
  userId: string;
  showModal: boolean;
  modalHeading: string;
  user: User;
  teachersubjects: Teachersubject[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private gradeService: GradeService,
    private accountService: AccountService,
    private apiService: ApiService,
    private _snackBar: MatSnackBar

  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userId = r.id;
    });
  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.teacher = this.userService.currentUserValue;
    this.userService.getUser(this.userId);
    this.userService.userObservable.subscribe(teacher => {
     if(teacher){
      this.teacher = teacher;
      if (this.teacher.Grades && this.teacher.Grades.length > 0) {
        this.teacher.Grades.forEach(grade => {
          grade.Subjects.forEach(subject => {
            subject.IsSelected = false;
            const existingTeacherSubject = this.getExistingTeacherSubject(subject.SubjectId, this.teacher.Teachersubjects);
            if (existingTeacherSubject && existingTeacherSubject.Id === '6d1a7f8c-0d14-11eb-b970-025041000001') {
              alert(subject.Name)
            }
            if (existingTeacherSubject && Number(existingTeacherSubject.StatusId) === STATUS_ACTIVE) {

              subject.IsSelected = true;
              if (existingTeacherSubject.Id === '6d1a7f8c-0d14-11eb-b970-025041000001') {
                alert(subject.Name)
              }
            }
          })
        });
      }
     }
    });
  }

  getExistingTeacherSubject(subjectId, teacherSubjects: TeacherSubject[]): TeacherSubject {
    return teacherSubjects.find(x => x.SubjectId === subjectId);
  }

  back() {
    this.router.navigate([`dashboard/teachers`])
  }

  add() {
    this.showModal = true;
    this.modalHeading = 'Teacher Subjects';
  }
  closeModal() {
    this.showModal = false;
  }

  selectSubject(subject: Subject) {
    subject.IsSelected = !subject.IsSelected;
  }
  saveAll() {
    const teacherSubjects: Teachersubject[] = [];
    this.teacher.Grades.forEach(grade => {
      grade.Subjects.forEach(subject => {
        const teacherSubject: TeacherSubject = {
          Id: '',
          UserId: this.teacher.UserId,
          SubjectId: subject.SubjectId,
          GradeId: subject.GradeId,
          CreateUserId: this.user.UserId,
          ModifyUserId: this.user.UserId,
          StatusId: subject.IsSelected ? STATUS_ACTIVE : STATUS_DELETED
        };
        const existingTeacherSubject = this.getExistingTeacherSubject(subject.SubjectId, this.teacher.Teachersubjects);
        if (existingTeacherSubject) {
          teacherSubject.Id = existingTeacherSubject.Id;
        }
        teacherSubjects.push(teacherSubject);
      })
    });

    this.apiService.add(`${ADD_TEACHER_SUBJECTS_URL}`, teacherSubjects).subscribe(data => {
      if (data) {
        console.log(data);
        this.openSnackBar(`Subjects assigned/unassigned to ${this.teacher.Name}!`, 'Success!');

      }
    });
  }
  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 3000
    });

  }
}
