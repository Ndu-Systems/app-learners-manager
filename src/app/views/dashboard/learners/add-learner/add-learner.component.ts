import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from 'src/app/_models';
import { Grade, Subject } from 'src/app/_models/grade.model';
import { User, UserModel } from 'src/app/_models/user.model';
import { AccountService, ApiService, EmailService, NavigationService } from 'src/app/_services';
import { ADD_LEARNER_URL, GET_GRADES_URL, GET__GRADE_DETAILS_URL } from 'src/app/_services/_shared';
import { ADMIN, SYSTEM, IS_DELETED_FALSE, AWAITING_ACTIVATION, LEARNER } from 'src/app/_shared';

@Component({
  selector: 'app-add-learner',
  templateUrl: './add-learner.component.html',
  styleUrls: ['./add-learner.component.scss']
})
export class AddLearnerComponent implements OnInit {
  @Output() doneAdding: EventEmitter<User> = new EventEmitter();
  user: User;
  rForm: FormGroup;
  showLoader: boolean;
  grades: Grade[] = [];

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
        GradeId: [null],
        UserType: LEARNER,
        CreateUserId: [this.user.UserId],
        ModifyUserId: [this.user.UserId],
        IsDeleted: [IS_DELETED_FALSE],
        StatusId: [AWAITING_ACTIVATION]
      });
    }

  }


  onSubmit(model: UserModel) {
    model.Roles = [];
    model.Roles.push({ Name: LEARNER });
    this.showLoader = true;
    model.Studentsubjects = this.subjects.filter(x => x.IsSelected);
    this.apiService.add(`${ADD_LEARNER_URL}`, model).subscribe(data => {
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
