import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/_models/topic.model';
import { User } from 'src/app/_models/user.model';
import { ApiService, AccountService } from 'src/app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { STATUS_DELETED, GET_TESTS_URL, UPDATE_TEST_URL, ADD_TEST_URL } from 'src/app/_services/_shared';
import { Subject } from 'src/app/_models/grade.model';
import { Tests } from 'src/app/_models/tests.model';
import { BreadCrumbModel, HeaderBannerModel } from 'src/app/_models';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  @Input() SubjectId: string;
  @Input() tests: Tests[];
  showModal: boolean;
  user: User;
  error: string;
  modalHeading = 'Set a new test';
  current: Tests;
  isDelete: boolean;
  isUpdate: boolean;
  subject: Subject;
  testDate: Date;
  crumbs: BreadCrumbModel[] = [];
  headerBanner: HeaderBannerModel = {
    Header: 'Subject tests',
    SubHeader: 'A collection of tests in the system.',
    ctaLabel: '+ Add test'
  };
  showPreview: boolean;
  constructor(
    private apiServices: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private _snackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.SubjectId = r.id;

    });
  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.showModal = false;
    this.current = undefined;
    this.isDelete = false;
    this.isUpdate = false;
  }
  add() {
    this.showModal = true;
    this.current = {
      SubjectId: this.SubjectId,
      Name: '',
      TestDate: '',
      TestTime: '',
      FinishTime: '',
      ShowResultSameTime: 0,
      Duration: '',
      Marks: undefined,
      CategoryId: '',
      ImageUrl: '',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    };;
    this.modalHeading = 'Set a new test';
    this.isDelete = false;
    this.isUpdate = false;
  }
  closeModal() {
    this.showModal = false;
    this.isDelete = false;
    this.showPreview = false;
  }
  open(id) {
    this.router.navigate(['dashboard/test', id]);
  }

  save() {

    this.error = '';
    if (!this.current.Name) {
      this.error = `⚠️ Enter topic name`;
      return false;
    }
    const findTipic = this.tests.find(x => x.Name.toLocaleLowerCase() === this.current.Name.toLocaleLowerCase());
    if (findTipic && !this.isDelete && !this.isUpdate) {
      this.error = `⚠️  ${this.current.Name} already exist.`;
      return false;
    }
    if (this.isDelete || this.isUpdate) {
      this.apiServices.add(UPDATE_TEST_URL, this.current).subscribe(res => {
        this.showModal = false;
        this.openSnackBar('Test updated.', 'Success!');
      })
    } else {
      this.apiServices.add(ADD_TEST_URL, this.current).subscribe(res => {
        this.showModal = false;
        this.openSnackBar('Test created.', 'Success!');
        this.tests.push(res);
      })
    }
  }

  goto(url) {
    this.router.navigate([`dashboard/${url}`])
  }
  options(item: Tests) {
    this.tests.map(x => x.Viewing = false);
    item.Viewing = true;
  }
  delete(item: Tests) {
    this.isDelete = true;
    this.current = item;
    this.current.StatusId = STATUS_DELETED;
    this.modalHeading = `${item.Name}  will be deleted, continue?`
    this.tests.map(x => x.Viewing = false);
  }
  edit(item: Tests) {

    this.current = item;
    this.testDate = new Date();
    this.modalHeading = 'Update test details.'
    this.showModal = true;
    this.isUpdate = true;
    this.tests.map(x => x.Viewing = false);
  }
  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 3000
    });

  }

  preview(item: Tests) {
    this.showPreview = true;
    this.current = item;
    this.modalHeading = item.Name;
  }

}
