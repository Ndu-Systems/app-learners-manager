import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ApiService, DocumentsService } from 'src/app/_services';
import { UPDATE_COMPANY_URL } from 'src/app/_services/_shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent implements OnInit {
  @Input() company;
  showModal: boolean;
  addDp: boolean;
  modalHeading: string;
  dpUrl: string;
  isUpdate: boolean;
  constructor(
    private documentsService: DocumentsService,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit() {
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
      formData.append('name', `otc.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.documentsService.uploadFile(formData).subscribe(url => {
        this.dpUrl = `${environment.API_URL}/api/upload/${url}`;
        this.company.Dp = this.dpUrl;
      });

    });

  }

  update() {
    this.apiServices.add(UPDATE_COMPANY_URL, this.company).subscribe(res => {
     this.closeModal();
      this.openSnackBar('Company updated  created.', 'Success!');
    })
  }
  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 3000
    });

  }
}
