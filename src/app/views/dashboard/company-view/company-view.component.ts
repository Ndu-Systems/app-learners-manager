import { Institution } from './../../../_models/company.model';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BreadCrumbModel, CompanyModel, HeaderBannerModel } from 'src/app/_models';
import { AccountService, ApiService, DocumentsService } from 'src/app/_services';
import { UPDATE_COMPANY_URL } from 'src/app/_services/_shared';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent implements OnInit {
  company: CompanyModel;
  @Input() gradeCount: number;

  showModal: boolean;
  addDp: boolean;
  modalHeading: string;
  dpUrl: string;
  isUpdate: boolean;
  error: string;
  Institution: Institution;
  crumbs: BreadCrumbModel[] = [
    {
      Label: 'grades',
      Link: '/dashboard/grades'
    },
    {
      Label: 'View Organization',
      Link: '/dashboard/company'
    },
  ];
  user:User;
  headerBanner: HeaderBannerModel = {
    Header: 'Organization Details',
    SubHeader: 'You organization information.'
  };
  constructor(
    private documentsService: DocumentsService,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar,
    private accountService: AccountService

  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if(this.user.Company) {
      this.company = this.user.Company;
    }
    this.Institution = this.company.Institutions[0];
  
  }

  showUplaod() {
    this.showModal = true;
    this.addDp = true;
    this.modalHeading = 'Upload company display picture.';
  }
  showEditUplaod() {
    this.showModal = true;
    this.isUpdate = true;
    this.modalHeading = 'Edit your organization profile';
  }
  closeModal() {
    this.showModal = false;
    this.addDp = false;
    this.isUpdate = false;
  }

  imageChanged(event) {
    const files = event.target.files;
    this.uplaodFile(files);
  }


  uplaodFile(files: FileList) {
    if (!files.length) {
      return false;
    }

    Array.from(files).forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `fundani.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.documentsService.uploadFile(formData).subscribe(url => {
        this.dpUrl = `${environment.API_URL}/api/upload/${url}`;
        this.company.Dp = this.dpUrl;
      });
    });

  }

  update() {
    this.apiServices.actionQuery(UPDATE_COMPANY_URL, this.company).subscribe(res => {
      this.closeModal();
      this.openSnackBar('Company updated  created.', 'Success!');
    })
  }
  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });
  }
}
