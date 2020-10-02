import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SplashService } from './splash.service';
import { User, UserModel } from '../_models/user.model';
import { COMMON_CONN_ERR_MSG, GET_GRADES_URL } from './_shared/constants';
import { map } from 'rxjs/operators';
import { TokenModel, EmailGetRequestModel, ChangePasswordModel } from '../_models';
import { Grade } from '../_models/grade.model';


@Injectable({
  providedIn: 'root'
})
export class GradeService {


  private gradesBehaviorSubject: BehaviorSubject<Grade[]>;
  public gardesObservable: Observable<Grade[]>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.gradesBehaviorSubject = new BehaviorSubject<Grade[]>(JSON.parse(localStorage.getItem('grades')) || []);
    this.gardesObservable = this.gradesBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentGradesValue(): Grade[] {
    return this.gradesBehaviorSubject.value;
  }

  updateUserState(grades: Grade[]) {
    this.gradesBehaviorSubject.next(grades);
    localStorage.setItem('grades', JSON.stringify(grades));
  }

  getGrades(companyId: string) {
    this.http.get<Grade[]>(`${this.url}/${GET_GRADES_URL}?CompanyId=${companyId}`).subscribe(data => {
      if (data) {
        this.updateUserState(data);
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
