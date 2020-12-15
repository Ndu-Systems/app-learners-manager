import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { ADD_SUBJECT_URL, UPDATE_SUBJECT_URL, STATUS_DELETED } from 'src/app/_services/_shared/constants';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { Grade, Subject } from 'src/app/_models/grade.model';
import { BreadCrumbModel, HeaderBannerModel } from 'src/app/_models';
import { MatSnackBar } from '@angular/material';
import { ADMIN } from 'src/app/_shared';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  @Input() subjects: Subject[];
  @Input() grade: Grade;

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
  text= '';
  grades: any;
  isDelete: boolean;
  crumbs: BreadCrumbModel[] = [];

  headerBanner: HeaderBannerModel = {
    Header: 'Subjects',
    SubHeader: 'A collection of subjects for grade in the system.',
    ctaLabel: '+ Add subject'
  };
  isAdmin: boolean;

  constructor(
    private apiServices: ApiService,
    private router: Router,
    private accountService: AccountService,
    private _snackBar: MatSnackBar
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
      this.apiServices.add(UPDATE_SUBJECT_URL, this.current).subscribe(res => {
        this.showModal = false;
        this.code = '';
        this.name = '';
        this.description = '';
        this.isDelete = false;
        if (!this.subjects) {
          this.subjects = [];
        }
        this.subjects.push(res);
      })
    } else {
      this.apiServices.add(ADD_SUBJECT_URL, data).subscribe(res => {
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
      duration: 3000
    });

  }
}
