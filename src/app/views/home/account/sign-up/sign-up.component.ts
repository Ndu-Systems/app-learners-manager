import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, ApiService, EmailService, NavigationService } from 'src/app/_services';
import { SYSTEM, IS_DELETED_FALSE, AWAITING_ACTIVATION, LEARNER, DEFAULT_PASSWORD, ACTIVE, ADMIN } from 'src/app/_shared';
import { UserModel } from 'src/app/_models/user.model';
import { first } from 'rxjs/operators';
import { Grade, Subject } from 'src/app/_models/grade.model';
import { GET_GRADES_URL, GET_INSTITUTION_TYPES_API, DEFAULT_DATE, GET_INSTITUTION_TYPES } from 'src/app/_services/_shared';
import { Email, InstitutionTypeModel, GenericQueryModel, NavigationModel, SignUpModel, GradeSignUpModel } from 'src/app/_models';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  rForm: FormGroup;
  error: string;
  personalErrors: string[] = [];
  companyErrors: string[] = [];
  gradeErrors: string[] = [];

  grades: Grade[];
  subjects: Subject[];
  selectedSubjects: any[] = [];
  hidePassword = true;
  institutionTypes: InstitutionTypeModel[] = [];
  paymentTypes: any[] = [];
  paymentOption: string;
  showLoader: boolean;
  loading: boolean;
  navigationModel: NavigationModel;
  showPersonalDetails: boolean = true;
  showOrganizationDetails: boolean;
  showInstitutionDetails: boolean;
  showSignUp: boolean;
  InstitutionTypeId: string;
  InstitutionTypes: InstitutionTypeModel[] = [];
  GradesToSelect: Grade[] = [];
  companyGrades: Grade[] = [];
  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private accountService: AccountService,
    private apiServices: ApiService,
    private emailService: EmailService,
    private navigationService: NavigationService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.InstitutionTypes = [];
    this.getInstitutionTypes();
    this.rForm = this.fb.group({
      Email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.email
      ])),
      Password: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      Name: [null, Validators.required],
      CompanyName: [null, Validators.required],
      Handler: [null],
      Surname: [null, Validators.required],
      GradeId: ['n/a'],
      UserType: ADMIN,
      CreateUserId: [SYSTEM],
      ModifyUserId: [SYSTEM],
      IsDeleted: [IS_DELETED_FALSE],
      StatusId: [AWAITING_ACTIVATION],
      InstitutionTypeId: [null, Validators.required]
    });
  }

  onSubmit(model: SignUpModel) {
    model.Roles = [];
    model.Roles.push({ Name: ADMIN });
    this.showLoader = true;
    model.Grades = [];
    this.companyGrades.forEach(item => {
      let itemToAdd: GradeSignUpModel = {
        GradeId: item.GradeId
      };
      model.Grades.push(itemToAdd);
    });
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

  getInstitutionTypes() {
    const query: GenericQueryModel = { StatusId: 1 }
    this.apiServices.getWithQuery(GET_INSTITUTION_TYPES, query).subscribe(data => {
      this.InstitutionTypes = data as InstitutionTypeModel[];
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


  loadOrganizationDetails() {
    this.loading = true;
    this.personalErrors = [];
    const name = this.rForm.get('Name').value;
    const surname = this.rForm.get('Surname').value;
    const phoneNumber = this.rForm.get('PhoneNumber').value;
    const email = this.rForm.get('Email').value;
    const password = this.rForm.get('Password').value;
    if (name === null || name === '') {
      this.personalErrors.push('Name is required');
    }
    if (surname === null || surname === '') {
      this.personalErrors.push('Surname is required');
    }
    if (phoneNumber === null || phoneNumber === '') {
      this.personalErrors.push('Phone number is required');
    }
    if (password === null || password === '') {
      this.personalErrors.push('Password is required');
    }
    if (email === null || email === '') {
      this.personalErrors.push('Email is required');
    }
    if (this.personalErrors.length > 0) {
      this.loading = false;
      return;
    } else {
      setTimeout(() => {
        this.showPersonalDetails = false;
        this.loading = false;
        this.showOrganizationDetails = true;
      }, 2000);
    }

  }

  loadInstitutionDetails() {
    this.loading = true;
    setTimeout(() => {
      this.showOrganizationDetails = false;
      this.getInstitutionTypes();
      this.loading = false;
    }, 1000);
    setTimeout(() => {
      this.showInstitutionDetails = true;
      this.showSignUp = true;
    }, 1000);

  }

  onSelectedInstitutionType(item: InstitutionTypeModel) {
    this.GradesToSelect = [];
    this.GradesToSelect = item.Grades;
  }
  onGradeSelect(grade: Grade) {
    const index = this.companyGrades.indexOf(grade);
    if (index < 0) {
      this.companyGrades.push(grade);
    } else {
      this.companyGrades.splice(index, 1);
    }
  }
  sendEmail(data: SignUpModel) {
    const emailToSend: Email = {
      Email: data.Email,
      Subject: 'Fundani.co.za: Welcome & Activation',
      Message: '',
      Link: this.accountService.generateAccountActivationReturnLink(data.UserToken)
    };
    this.showLoader = true;
    this.emailService.sendAccountActivationEmail(emailToSend)
      .subscribe(response => {
        if (response > 0) {
          setTimeout(() => {
            this.showLoader = false;
            this.openSnackBar('Account Registered successfully. Check your email', 'Got It!');
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
  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });
  }


}
