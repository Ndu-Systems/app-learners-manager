import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, ApiService, EmailService, NavigationService } from 'src/app/_services';
import { SYSTEM, IS_DELETED_FALSE, AWAITING_ACTIVATION, LEARNER, DEFAULT_PASSWORD, ACTIVE, ADMIN } from 'src/app/_shared';
import { UserModel } from 'src/app/_models/user.model';
import { first } from 'rxjs/operators';
import { Grade, Subject } from 'src/app/_models/grade.model';
import { GET_GRADES_URL, GET_INSTITUTION_TYPES_API, DEFAULT_DATE } from 'src/app/_services/_shared';
import { Email, InstitutionTypeModel, GenericQueryModel, NavigationModel } from 'src/app/_models';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  rForm: FormGroup;
  error: string;
  grades: Grade[];
  subjects: Subject[];
  selectedSubjects: any[] = [];
  hidePassword = true;
  institutionTypes: InstitutionTypeModel[] = [];
  paymentTypes: any[] = [];
  paymentOption: string;
  showLoader: boolean;
  navigationModel: NavigationModel;

  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private accountService: AccountService,
    private apiServices: ApiService,
    private emailService: EmailService,
    private navigationService: NavigationService

  ) { }

  ngOnInit() {

    this.rForm = this.fb.group({
      Email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.email
      ])),
      Password: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      Name: [null, Validators.required],
      CompanyName: [null, Validators.required],
      Surname: [null, Validators.required],
      GradeId: ['n/a'],
      UserType: ADMIN,
      CreateUserId: [SYSTEM],
      ModifyUserId: [SYSTEM],
      IsDeleted: [IS_DELETED_FALSE],
      StatusId: [AWAITING_ACTIVATION]
    });

  }

  onSubmit(model: UserModel) {
    model.Roles = [];
    model.Roles.push({ Name: ADMIN });
    this.showLoader = true;

    this.accountService.register(model).subscribe(data => {
      // send email logic here.
      if (data.Email) {
        this.sendEmail(data);
      } else {
        alert(data);
        return;
      }
    });
  }

  getGrades() {
    this.apiServices.get(GET_GRADES_URL).subscribe(data => {
      if (data) {
        this.grades = data;
        this.gradeSelected(this.grades[3].GradeId)
      }
    });
  }
  gradeSelected(gradeId: string) {
    const grade = this.grades.find(x => x.GradeId === gradeId);
    if (!grade) { return; }
    if (grade.Subjects) {
      this.subjects = grade.Subjects;
      this.subjects.map(x => x.Class = ['subject']);
    }
    this.selectedSubjects = [];
  }
  selectSubject(subject: Subject) {
    const index = this.selectedSubjects.indexOf(subject);
    if (subject.Class.find(x => x === 'active')) {
      subject.Class = ['subject'];
      this.selectedSubjects.splice(index, 1);
      return true;
    }
    subject.Class = ['subject', 'active'];
    this.selectedSubjects.push(subject);
  }

  sendEmail(data: UserModel) {
    const emailToSend: Email = {
      Email: data.Email,
      Subject: 'Online Thalente: Welcome & Activation',
      Message: '',
      Link: this.accountService.generateAccountActivationReturnLink(data.UserToken)
    };
    this.showLoader = true;
    this.emailService.sendAccountActivationEmail(emailToSend)
      .subscribe(response => {
        if (response > 0) {
          setTimeout(() => {
            this.showLoader = false;
            alert('Account Registered successfully, PLEASE Check your email for activation');
            this.routeTo.navigate(['']);
          }, 1000);
        }
      });
  }
  sendSendBillingEmail(data: UserModel) {
    const billing = data.Billing;
    if (!billing) {
      this.navigateHome();
      return;
    }
    const emailToSend: Email = {
      Email: data.Email,
      Subject: 'OTC Billing Details',
      Message: '',
      Link: this.accountService.generateAccountActivationReturnLink(data.UserToken),
      UserFullName: `${data.Name} ${data.Surname}`,
      Name: billing.Name,
      Amount: billing.Amount,
      AmountPaid: billing.AmountPaid,
      AmountDue: billing.Amount - billing.AmountPaid,
      NextBillingDate: billing.NextBillingDate
    };
    this.showLoader = true;
    this.emailService.sendBillingEmail(emailToSend)
      .subscribe(response => {
        if (response > 0) {
          setTimeout(() => {
            this.showLoader = false;
            this.navigateHome();
          }, 1000);
        } else {
        }
      });
  }

  navigateHome() {
    this.navigationModel = {
      IsHome: true,
      NavUrl: '',
      Title: 'Home'
    };
    this.navigationService.updateNavigationState(this.navigationModel);
    this.routeTo.navigate(['']);

  }

}
