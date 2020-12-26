import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Email } from 'src/app/_models';
import { Grade, Subject } from 'src/app/_models/grade.model';
import { User, UserModel } from 'src/app/_models/user.model';
import { AccountService, EmailService, ApiService } from 'src/app/_services';
import { GET_GRADES_URL, ADD_LEARNER_URL, GET__GRADE_DETAILS_URL } from 'src/app/_services/_shared';
import { LEARNER, IS_DELETED_FALSE, AWAITING_ACTIVATION, TEACHER } from 'src/app/_shared';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  @Output() doneAdding: EventEmitter<User> = new EventEmitter();
  user: User;
  rForm: FormGroup;
  showLoader: boolean;
  grades: Grade[] = [];
  error = '';

  subjects: Subject[] = [];
  grade: Grade;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private emailService: EmailService,
    private apiService: ApiService,

  ) {

  }

  ngOnInit() {

    this.user = this.accountService.currentUserValue;
    if (this.user) {
      this.showLoader = true;
      this.apiService.get(`${GET_GRADES_URL}?CompanyId=${this.user.CompanyId}`).subscribe(data => {
        if (data) {
          this.grades = data;
          this.showLoader = false;
        }
      });
      this.rForm = this.fb.group({
        Email: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.email
        ])),
        Password: ['notset', Validators.required],
        PhoneNumber: [null, Validators.required],
        Name: [null, Validators.required],
        CompanyId: [this.user.CompanyId, Validators.required],
        Surname: [null, Validators.required],
        GradeId: [''],
        UserType: TEACHER,
        CreateUserId: [this.user.UserId],
        ModifyUserId: [this.user.UserId],
        IsDeleted: [IS_DELETED_FALSE],
        StatusId: [AWAITING_ACTIVATION]
      });
    }

  }


  onSubmit(model: UserModel) {
    model.Roles = [];
    model.Roles.push({ Name: TEACHER });
    this.showLoader = true;
    model.Studentsubjects = [];
    
    this.apiService.actionQuery(`${ADD_LEARNER_URL}`, model).subscribe(data => {
      // send email logic here.
      if (data.Email) {
        this.sendEmail(data);
        this.doneAdding.emit(data);
      } else {
        alert(data);
        return;
      }
    });
  }
  sendEmail(data: UserModel) {
    const emailToSend: Email = {
      Email: data.Email,
      Subject: 'Fundani: Welcome & Activation',
      Message: '',
      Link: this.accountService.generateAccountActivationReturnLink(data.UserToken)
    };
    this.emailService.sendAccountActivationEmail(emailToSend)
      .subscribe(response => {
        if (response > 0) {

        }
      });
  }

  gradeChanged(gradeId: string) {
    this.apiService.get(`${GET__GRADE_DETAILS_URL}?GradeId=${gradeId}`).subscribe(data => {
      if (data) {
        this.grade = data;
        this.subjects = this.grade.Subjects;
        this.subjects.map(x => x.IsSelected = true);
      }
    });

  }

}
