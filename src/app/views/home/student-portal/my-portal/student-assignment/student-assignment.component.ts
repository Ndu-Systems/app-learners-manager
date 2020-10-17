import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/_models/assignment.model';
import { AccountService, ApiService } from 'src/app/_services';
import { StudentPortalService } from 'src/app/_services/student.portal.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/_services/upload.service';


@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['./student-assignment.component.scss']
})
export class StudentAssignmentComponent implements OnInit {
  assignment: Assignment;

  constructor(
    private portalService: StudentPortalService,
    private router: Router,
    private _location: Location,
    private accountService: AccountService,
    private apiServices: ApiService,
    private uploadService: UploadService,
  ) { }

  ngOnInit() {
    this.assignment = this.portalService.getCurrentAssignment;

  }
  goHome() {
    this._location.back();
  }

  public uploadFile = (files: FileList) => {
    if (files.length === 0) {
      return;
    }

    Array.from(files).forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `otc.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.uploadService.uploadFile(formData).subscribe(url => {
        const uploadedImage = `${environment.API_URL}/api/upload/${url}`;
        // this.onUploadFinished.emit(uploadedImage);
      });

    });




  }

}
