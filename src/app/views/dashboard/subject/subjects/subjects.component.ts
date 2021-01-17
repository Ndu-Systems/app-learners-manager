import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { ADD_SUBJECT_URL, UPDATE_SUBJECT_URL, STATUS_DELETED } from 'src/app/_services/_shared/constants';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { Grade, Subject } from 'src/app/_models/grade.model';
import { BreadCrumbModel, ButtonActionModel, HeaderBannerModel, NavigationModel } from 'src/app/_models';
import { MatSnackBar } from '@angular/material';
import { ADD_ACTION, ADMIN } from 'src/app/_shared';
import { NavigationService } from 'src/app/_services';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  @Input() subjects: Subject[];
  @Input() grade: Grade;
  @Output() updatedSubjects: EventEmitter<Subject[]> = new EventEmitter(null);
  showModal: boolean;
  name: string;

  code = '';
  user: User;
  description = '';
  passMark = '';
  error: string;
  isUpdate: boolean;
  current: Subject;
  modalHeading = 'Add new subject';
  text = '';
  grades: any;
  isDelete: boolean;
  crumbs: BreadCrumbModel[] = [];

  headerBanner: HeaderBannerModel = {
    Header: 'Subjects',
    SubHeader: 'A collection of subjects for grade in the system.',
    ctaLabel: '+ Add subject'
  };
  isAdmin: boolean;
  navigationModel: NavigationModel;
  actionButtons: ButtonActionModel[] = [
    {
      actionType: ADD_ACTION,
      label: 'subject'
    }
  ];
  constructor(
    private apiServices: ApiService,
    private router: Router,
    private accountService: AccountService,
    private _snackBar: MatSnackBar,
    private navigationService: NavigationService,

  ) {
  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (this.user.UserType === ADMIN) {
      this.isAdmin = true;;
    }
  }
  add() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.isDelete = false;
  }

  openTest(id) {
    this.router.navigate(['dashboard/tests', id]);
  }

  openSubject(subject: Subject) {
    this.navigationModel = {
      IsDashboard: false,
      NavUrl: 'subject',
      Title: `View Subject`
    };
    this.navigationService.updateNavigationState(this.navigationModel);
    this.router.navigate(['dashboard/subject', subject.SubjectId]);
  }

  save() {
    const data = {
      GradeId: this.grade.CompanyGradeId,
      Name: this.name,
      ImageUrl: "",
      Description: this.description,
      Code: this.code,
      PassMark: this.passMark,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    };
    this.error = '';
    if (!this.name) {
      this.error = `⚠️ Enter subjects name`;
      return false;
    }

    const findGrade = this.subjects.find(x => x.Name.toLocaleLowerCase() === this.name.toLocaleLowerCase());
    if (findGrade && !this.isUpdate && !this.isDelete) {
      this.error = `⚠️  ${this.name} already exist.`;
      return false;
    }
    if (this.isUpdate || this.isDelete) {
      this.current.Name = this.name;
      this.current.Description = this.description;
      this.current.Code = this.code;
      this.current.PassMark = this.passMark;
      this.apiServices.actionQuery(UPDATE_SUBJECT_URL, this.current).subscribe(res => {
        const modelToUpdate = res as Subject;
        this.code = '';
        this.name = '';
        this.description = '';
        if (!this.subjects) {
          this.subjects = [];
        }
        if (this.isDelete) {

          const model = this.subjects.find(x => x.SubjectId === modelToUpdate.SubjectId);
          if (model) {
            const index = this.subjects.indexOf(model);
            this.subjects.splice(index, 1);
          }
        } else {
          const model = this.subjects.find(x => x.SubjectId === modelToUpdate.SubjectId);
          if (model) {
            const index = this.subjects.indexOf(model);
            this.subjects[index] = modelToUpdate;
          }
        }
        this.updatedSubjects.emit(this.subjects);
        this.isDelete = false;
        this.showModal = false;
      })
    } else {
      this.apiServices.actionQuery(ADD_SUBJECT_URL, data).subscribe(res => {
        this.showModal = false;
        this.code = '';
        this.name = '';
        this.description = '';
        if (!this.subjects) {
          this.subjects = [];
        }
        if (res) {
          let sub: Subject = res;
          sub.Lessons = [];
          this.subjects.push(sub);
          this.updatedSubjects.emit(this.subjects);
          this.openSnackBar('Subject created.', 'Success!');
        }
      })
    }
  }

  goto(url) {
    this.router.navigate([`dashboard/${url}`])
  }

  options(item: Subject) {
    this.subjects.map(x => x.Viewing = false);
    item.Viewing = true;
  }
  delete(item: Subject) {
    this.isDelete = true;
    this.name = item.Name;
    this.current = item;
    this.current.StatusId = STATUS_DELETED;
    this.modalHeading = `DELETE ${item.Name}?`;
    this.text = `${item.Name}  will be deleted, continue?`;
    this.subjects.map(x => x.Viewing = false);
  }
  edit(item: Subject) {
    this.showModal = true;
    this.isUpdate = true;
    this.name = item.Name;
    this.code = item.Code;
    this.passMark = item.PassMark;
    this.description = item.Description;
    this.current = item;
    this.modalHeading = 'Update subject.'
    this.subjects.map(x => x.Viewing = false);
  }

  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });

  }
}
