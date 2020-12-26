import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Assignment } from 'src/app/_models/assignment.model';
import { ImageModel } from 'src/app/_models/image.model';
import { AccountService, ApiService } from 'src/app/_services';
import { ImageService } from 'src/app/_services/image.service';
import { ADD_ASSIGNMENT_URL, UPDATE_ASSIGNMENT_URL } from 'src/app/_services/_shared';

@Component({
  selector: 'app-list-assignments',
  templateUrl: './list-assignments.component.html',
  styleUrls: ['./list-assignments.component.scss']
})
export class ListAssignmentsComponent implements OnInit {
  @Input() assignments: Assignment[];
  @Input() subjectId;
  @Input() gradeId;
  @Input() subjectName: string;
  showModal: boolean;
  modalHeading: string;
  assignment: Assignment;
  user: any;
  error: string;
  showLoader: boolean;
  showPreview: boolean;
  showDelete: boolean;
  constructor(
    private apiServices: ApiService,
    private accountService: AccountService,
    private imageService: ImageService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.assignments.forEach(assignment => {
      assignment.Images.forEach(image => {
        image.Ext = image.Url.split(".")[image.Url.split(".").length - 1];
      });
    })
  }
  add() {
    this.showModal = true;
    this.modalHeading = `Add Assignment  | ${this.subjectName}`;
    this.assignment = {
      Tittle: undefined,
      GradeId: this.gradeId,
      SubjectId: this.subjectId,
      Instructions: undefined,
      Points: undefined,
      DueDate: undefined,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1,
    }
  }
  preview(assignment: Assignment) {
    this.assignment = assignment;
    this.showPreview = true;
    this.modalHeading = `Preview  |  ${assignment.Tittle}`
  }
  closeModal() {
    this.showModal = false;
    this.showPreview = false;
  }
  save() {

    this.error = '';
    if (!this.assignment.Tittle) {
      this.error = `⚠️ Enter  assignment  title`;
      return false;
    }
    this.showLoader = true;

    this.apiServices.actionQuery(ADD_ASSIGNMENT_URL, this.assignment).subscribe(res => {
      this.showModal = false;
      this.assignments.push(res);
      this.showLoader = false;
      this.openSnackBar('Assignment created.', 'Success!');
    })
  }
  update() {

    this.error = '';
    if (!this.assignment.Tittle) {
      this.error = `⚠️ Enter  assignment  title`;
      return false;
    }
    this.showLoader = true;

    this.apiServices.actionQuery(UPDATE_ASSIGNMENT_URL, this.assignment).subscribe(res => {
      this.closeModal();
      this.showLoader = false;
      this.openSnackBar('Assignment updated.', 'Success!');
    })
  }
  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });

  }

  uploadFinished(imageUr: string) {
    if (imageUr && this.assignment && this.assignment.AssignmentId) {
      const image: ImageModel = {
        Url: imageUr,
        OtherId: this.assignment.AssignmentId,
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
  formatBody() {

  }
}
