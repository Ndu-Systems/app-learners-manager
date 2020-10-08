import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade, Subject, Teachersubject } from 'src/app/_models/grade.model';
import { User } from 'src/app/_models/user.model';
import { AccountService, ApiService } from 'src/app/_services';
import { GradeService } from 'src/app/_services/grade.service';
import { UserService } from 'src/app/_services/user.service';
import { ADD_TEACHER_SUBJECTS_URL } from 'src/app/_services/_shared';

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
  grades: Grade[] = [];
  teachersubjects: Teachersubject[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private gradeService: GradeService,
    private accountService: AccountService,
    private apiService: ApiService,
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
      this.teacher = teacher;
    });
    this.gradeService.gardesObservable.subscribe(grades => {
      if (this.grades) {
        this.grades = grades;
        if (this.grades.length > 0) {
          this.viewGrade(this.grades[0]);
          // this.add();
        }
      }
    });
    this.gradeService.getGrades(this.user.CompanyId);
  }

  back() {
    this.router.navigate([`dashboard/teachers`])
  }
  viewGrade(grade: Grade) {
    this.grades.map(x => x.Viewing = false);
    this.grades.map(x => x.Class = ['grade']);
    grade.Viewing = true;
    grade.Class = ['grade', 'active'];
  }
  add() {
    this.showModal = true;
    this.modalHeading = 'Teacher Subjects';
  }
  closeModal() {
    this.showModal = false;
  }

  selectSubject(subject: Subject) {
    const item: Teachersubject = {
      Id: '',
      UserId : this.teacher.UserId,
      SubjectId: subject.SubjectId,
      GradeId: subject.GradeId,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }
    const index = this.teachersubjects.map(x=>x.SubjectId).indexOf(subject.SubjectId);
    subject.Viewing = !subject.Viewing
    if(subject.Viewing){
      subject.Class = ['option', 'active'];
      if(index < 0){
        this.teachersubjects.push(item);
      }
      return true;
    }
    if(!subject.Viewing){
      subject.Class = ['option'];
      if(index > 0){
        this.teachersubjects.splice(index,1);
      }
      return true;
    }
  }
  saveAll(){ 
    this.apiService.add(`${ADD_TEACHER_SUBJECTS_URL}`, this.teachersubjects).subscribe(data => {
      if (data) {
        this.closeModal();
      } 
    });
  }

}
