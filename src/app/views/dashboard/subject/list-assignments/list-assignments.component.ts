import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ImageModel } from 'src/app/_models/image.model';
import { AccountService, ApiService } from 'src/app/_services';
import { ImageService } from 'src/app/_services/image.service';
import { ADD_ASSIGNMENT_URL } from 'src/app/_services/_shared';

@Component({
  selector: 'app-list-assignments',
  templateUrl: './list-assignments.component.html',
  styleUrls: ['./list-assignments.component.scss']
})
export class ListAssignmentsComponent implements OnInit {
@Input() assignments;
@Input() subjectId;
@Input() gradeId;
  showModal: boolean;
  modalHeading: string;
  subjectName: any;
  assignment:any;
  user: any;
  error: string;
  showLoader: boolean;
  description: string;
  constructor(
    private apiServices: ApiService,
    private accountService: AccountService,
    private imageService: ImageService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
  }
  add() {
    this.showModal = true;
    this.modalHeading = `Add Lesson | ${this.subjectName}`;
    this.assignment = {
      Tittle: undefined,
      GradeId: this.gradeId,
      SubjectId: this.subjectId,
      Instructions: undefined,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1,
    }
  }
  closeModal() {
    this.showModal = false;
  }
  save() {

    this.error = '';
    if (!this.assignment.Tittle) {
      this.error = `⚠️ Enter  content tittle`;
      return false;
    }
    this.showLoader = true;
 
    this.apiServices.add(ADD_ASSIGNMENT_URL, this.assignment).subscribe(res => {
      this.showModal = false;
      this.description = '';
      this.assignments.push(res);
      this.showLoader = false;
      this.openSnackBar('Assignment created.', 'Success!');
    })
  }
  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 3000
    });

  }

  uploadFinished(imageUr: string) {
    if (imageUr && this.assignment && this.assignment.ExperienceId) {
      const image: ImageModel = {
        Url: imageUr,
        OtherId: this.assignment.ExperienceId,
        IsDeleted: false,
        CreateUserId: this.user.UserId,
        ModifyUserId: this.user.UserId,
        StatusId: 1,
      };

      this.imageService.addImage(image).subscribe(data => {
        if (data && data.ImageId) {
          this.assignment.Images.push(data);
        }
      });
    }
  }

}
