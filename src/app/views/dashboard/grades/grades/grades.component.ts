import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { GET_GRADES_URL, ADD_GRADE_URL, UPDATE_GRADE_URL, STATUS_DELETED } from 'src/app/_services/_shared/constants';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { Grade } from 'src/app/_models/grade.model';
import { BreadCrumbModel, HeaderBannerModel, InstitutionTypeModel, GenericQueryModel } from 'src/app/_models';
import { GET_INSTITUTION_TYPES_API } from 'src/app/_services/_shared';
import { GradeService } from 'src/app/_services/grade.service';
import { Observable } from 'rxjs';
import { TeacherSubject } from 'src/app/_models/teacher.grade.subject ';
import { ADMIN } from 'src/app/_shared';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {
  allGrades: Grade[] = [];
  showModal: boolean;
  name: any;
  institutionTypeId: any;
  user: User;
  description = '';
  errors: string[];
  modalHeading = 'Add grade';
  isUpdate: boolean;
  current: Grade;
  error = '';
  institutionTypes: InstitutionTypeModel[] = [];
  grades$: Observable<TeacherSubject[]>;
  isDelete: boolean;
  $status: HTMLElement;
  isAdmin: boolean;

  constructor(
    private apiServices: ApiService,
    private router: Router,
    private accountService: AccountService,
    private gradeService: GradeService,

  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.grades$ = this.gradeService.teacherSubjectListObservable;
    // this.gradeService.getGrades(this.user.CompanyId);
    this.gradeService.getTeacherGradesSubjects(this.user.UserId, this.user.UserType, this.user.CompanyId);
    this.gradeService.gardesObservable.subscribe(data => {
      if (data) {
        this.allGrades = data;
      }
    });

    // this.requestPermission();
    // this.nonPersistentNotification();
    this.getInstitutionTypes();
    if (this.user.UserType === ADMIN) {
      this.isAdmin = true;;
    }
  }


  getInstitutionTypes() {
    const query: GenericQueryModel = { StatusId: 1 };
    this.apiServices.getWithQuery(GET_INSTITUTION_TYPES_API, query).subscribe(data => {
      const institutions = data as InstitutionTypeModel[];
      if (institutions != null &&
        institutions != undefined &&
        institutions.length > 0) {
        this.institutionTypes = institutions;
      }
    })
  }

  open(id) {
    this.router.navigate(['dashboard/subjects', id]);
  }

  update() {
    this.apiServices.add(UPDATE_GRADE_URL, this.current).subscribe(res => {
      this.showModal = false;
      this.isDelete = false;
      this.isUpdate = false;
      this.name = '';
      this.description = '';
      this.institutionTypeId = undefined;
      this.ngOnInit();
      this.isUpdate = false;
    })
  }
  goto(url) {
    this.router.navigate([`dashboard/${url}`])
  }

  options(item: Grade) {
    this.allGrades.map(x => x.Viewing = false);
    item.Viewing = true;
  }
  closeOptions() {
    this.allGrades.map(x => x.Viewing = false);
  }

  delete(item: Grade) {
    item.StatusId = STATUS_DELETED;
    this.current = item;
    this.showModal = true;
    this.isDelete = true;
    this.isUpdate = true;
    this.modalHeading = 'Delete grade.'
    this.allGrades.map(x => x.Viewing = false);
  }
  edit(item: Grade) {
    this.showModal = true;
    this.isUpdate = true;
    this.name = item.Name;
    this.institutionTypeId = item.InstituteTypeId;
    this.current = item;
    this.modalHeading = 'Update grade.'
    this.allGrades.map(x => x.Viewing = false);
  }


  requestPermission() {
    if (!('Notification' in window)) {
      alert('Notification API not supported!');
      return;
    }

    Notification.requestPermission(function (result) {
      // this.$status.innerText = result;
      // alert(result);
    });
  }

  nonPersistentNotification() {
    if (!('Notification' in window)) {
      alert('Notification API not supported!');
      return;
    }

    try {
      var notification = new Notification("Hi there - non-persistent!");
    } catch (err) {
      alert('Notification API error: ' + err);
    }
  }

  closeModal(){}
}
