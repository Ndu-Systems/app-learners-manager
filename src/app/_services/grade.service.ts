import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../_models/user.model';
import { GET_GRADES_URL, GET_TEACHER_GRADES_SUBJECTS_URL } from './_shared/constants';
import { map } from 'rxjs/operators';
import { Grade } from '../_models/grade.model';
import { TeacherSubject } from '../_models/teacher.grade.subject ';


@Injectable({
  providedIn: 'root'
})
export class GradeService {


  private gradesBehaviorSubject: BehaviorSubject<Grade[]>;
  public gardesObservable: Observable<Grade[]>;

  private gradeBehaviorSubject: BehaviorSubject<Grade>;
  public gardeObservable: Observable<Grade>;

  teacherSubjectListBehaviorSubject: BehaviorSubject<TeacherSubject[]>;
  public teacherSubjectListObservable: Observable<TeacherSubject[]>;

  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.gradesBehaviorSubject = new BehaviorSubject<Grade[]>(JSON.parse(localStorage.getItem('grades')) || []);
    this.gardesObservable = this.gradesBehaviorSubject.asObservable();

    this.gradeBehaviorSubject = new BehaviorSubject<Grade>(JSON.parse(localStorage.getItem('grade')));
    this.gardeObservable = this.gradeBehaviorSubject.asObservable();

    this.teacherSubjectListBehaviorSubject = new BehaviorSubject<TeacherSubject[]>(JSON.parse(localStorage.getItem('teacherSubjects')) || []);
    this.teacherSubjectListObservable = this.teacherSubjectListBehaviorSubject.asObservable();

    this.url = environment.API_URL;
  }

  public get currentGradesValue(): Grade[] {
    return this.gradesBehaviorSubject.value;
  }
  public get currentSelectedGradeValue(): Grade {
    return this.gradeBehaviorSubject.value;
  }

  updateUserState(grades: Grade[]) {
    this.gradesBehaviorSubject.next(grades);
    localStorage.setItem('grades', JSON.stringify(grades));
  }
  updateTeacherGradesStudentState(teacherSubjects: TeacherSubject[]) {
    this.teacherSubjectListBehaviorSubject.next(teacherSubjects);
    localStorage.setItem('teacherSubjects', JSON.stringify(teacherSubjects));
  }

  updateSelectedGradeState(grade: Grade) {
    this.gradeBehaviorSubject.next(grade);
    localStorage.setItem('grades', JSON.stringify(grade));
  }

  getGrades(companyId: string) {
    this.http.get<Grade[]>(`${this.url}/${GET_GRADES_URL}?CompanyId=${companyId}`).subscribe(data => {
      if (data) {
        this.updateUserState(data);
      }
    });
  }

  getTeacherGradesSubjects(userId: string, userType: string, companyId: string) {
    this.http.get<TeacherSubject[]>(`${this.url}/${GET_TEACHER_GRADES_SUBJECTS_URL}?UserId=${userId}&UserType=${userType}&CompanyId=${companyId}`).subscribe(data => {
      if (data) {
        this.updateTeacherGradesStudentState(data);
      }
    });
  }

  register(model: UserModel) {
    return this.http.post<UserModel>(`${this.url}/api/account/register.php`, model).pipe(map(user => {
      if (user) {
        return user;
      }
    }));
  }

}
