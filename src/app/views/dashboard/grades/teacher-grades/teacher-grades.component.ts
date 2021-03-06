import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { GenericQueryModel, InstitutionTypeModel } from 'src/app/_models';
import { Grade, Subject } from 'src/app/_models/grade.model';
import { User } from 'src/app/_models/user.model';
import { AccountService, ApiService } from 'src/app/_services';
import { GradeService } from 'src/app/_services/grade.service';
import { GET_INSTITUTION_TYPES_API } from 'src/app/_services/_shared';
import { ADD_GRADE_URL, UPDATE_GRADE_URL } from 'src/app/_services/_shared/constants';

@Component({
  selector: 'app-teacher-grades',
  templateUrl: './teacher-grades.component.html',
  styleUrls: ['./teacher-grades.component.scss']
})
export class TeacherGradesComponent implements OnInit {
  @Input() grades: Grade[];
  institutionTypes: InstitutionTypeModel[];
  grade: Grade;
  gradeId: string;
  showModal: boolean;
  isUpdate: boolean;
  modalHeading: string;
  isDelete: boolean;
  errors: any[];
  gradeToAdd: Grade;
  user: User;
  InstitutionTypeId: any;
  constructor(
    private apiServices: ApiService,
    private accountService: AccountService,
    private _snackBar: MatSnackBar,
    private gradeService: GradeService
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;

    if (this.grades && this.grades.length) {
      if (this.gradeService.currentSelectedGradeValue) {
        this.grade = this.gradeService.currentSelectedGradeValue;
        this.gradeId = this.grade.GradeId;
      } else {
        this.grade = this.grades[0];
        this.gradeId = this.grade.GradeId;
      }

    }

    this.getInstitutionTypes();

  }
  gradeChanged(gradeId: string) {
    const grade = this.grades.find(x => x.GradeId === gradeId);
    this.grade = grade;
    this.gradeService.updateSelectedGradeState(grade);
  }

  onSubjectsUpdated(subjects: Subject[]){
    this.grade.Subjects = subjects;
    this.gradeService.updateSelectedGradeState(this.grade);
  }

  addGrade() {
    this.showModal = true;
    this.isUpdate = false;
    this.modalHeading = 'Add grade';

    this.gradeToAdd = {
      CompanyId: this.user.CompanyId,
      Name: '',
      Description: '',
      InstitutionTypeId: 0,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }
  }


  closeModal() {
    this.showModal = false;
    this.isDelete = false;
    this.isUpdate = false;
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

  selectedInstitutionType($event) {
    const typeName = $event.target.value;
    const instituteType = this.institutionTypes.find(x => x.Name === typeName);
    this.gradeToAdd.InstitutionTypeId = instituteType.InstitutionTypeId;
  }
  save() {

    this.errors = [];
    if (!this.gradeToAdd.InstitutionTypeId) {
      this.errors.push(`⚠️ Institution type is required`);
    }
    if (!this.gradeToAdd.Name) {
      this.errors.push(`⚠️ Enter grade name`);
    }
    const findGrade = this.grades.find(x => x.Name.toLocaleLowerCase() === this.gradeToAdd.Name.toLocaleLowerCase());
    if (findGrade) {
      this.errors.push(`⚠️  ${this.gradeToAdd.Name} already exist.`);
    }
    if (this.errors.length > 0) {
      return false;
    }
    this.apiServices.actionQuery(ADD_GRADE_URL, this.gradeToAdd).subscribe(res => {
      if (res && res.GradeId) {
        res.Subjects = [];
        this.grades.push(res);
        this.grade = res;
        this.gradeId = res.GradeId;
        this.openSnackBar('The grade was created successfuly!', res.Name);
      }
      this.closeModal();
    })

  }
  update() {

    this.errors = [];
    if (!this.grade.InstitutionTypeId) {
      this.errors.push(`⚠️ Institution type is required`);
    }
    if (!this.grade.Name) {
      this.errors.push(`⚠️ Enter grade name`);
    }


    if (this.errors.length > 0) {
      return false;
    }

    this.apiServices.actionQuery(UPDATE_GRADE_URL, this.grade).subscribe(res => {
      this.openSnackBar('The grade was updated successfuly!', this.grade.Name);
      this.closeModal();

    });
  }

  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });

  }

  editGrade(grade) {
    if (grade) {
      this.modalHeading = `Update ${grade.Name}`
      this.gradeToAdd = null;
      this.grade = grade;
      this.showModal = true;
      this.isUpdate = true;
    }
  }


}
