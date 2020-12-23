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
  error = '';

  subjects: Subject[] = [];
  learnerSubjects: Subject[] = [];
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

      if (this.user.Company) {
        const institution = this.user.Company.Institutions[0];
        if (institution.Grades) {
          // make sure that grades/years have subjects
          this.grades = institution.Grades.filter(x => x.Subjects.length > 0);
          this.showLoader = false;
        } else {
          alert('He is dead jim')
        }

      }
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
        GradeId: [null, Validators.required],
        UserType: LEARNER,
        CreateUserId: [this.user.UserId],
        ModifyUserId: [this.user.UserId],
        IsDeleted: [IS_DELETED_FALSE],
        StatusId: [AWAITING_ACTIVATION]
      });
    }

  }

  onSubjectSelect(item: Subject) {
    const index = this.learnerSubjects.indexOf(item);
    if (index < 0) {
      this.learnerSubjects.push(item);
    } else {
      this.learnerSubjects.splice(index, 1);
    }
  }

  onSubmit(model: UserModel) {
    model.Roles = [];
    model.Roles.push({ Name: LEARNER });
    this.showLoader = true;
    model.Studentsubjects = this.learnerSubjects;
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
          this.showLoader = false;

        }
      });
  }

  gradeChanged(gradeId: string) {
    this.subjects = []; // ensure old subjects get formatted.
    const selectedGrade = this.grades.find(x => x.CompanyGradeId === gradeId);
    this.subjects = this.grades.find(x => x.GradeId === selectedGrade.GradeId).Subjects;
  }


}
