import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/_models/user.model';
import { AccountService, ApiService, DocumentsService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-dp',
  templateUrl: './user-dp.component.html',
  styleUrls: ['./user-dp.component.scss']
})
export class UserDpComponent implements OnInit {
  user: User;
  showModal: boolean;
  addDp: boolean;
  modalHeading: string;
  dpUrl: string;
  error;
  constructor(
    private documentsService: DocumentsService,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
  }
  showUpload() {
    this.showModal = true;
    this.addDp = true;
    this.modalHeading = 'Upload new profile picture';
  }

  closeModal() {
    this.showModal = false;
    this.addDp = false;
  }


  imageChanged($event) {
    const files = $event.target.files;
    if (!files.length) {
      return false;
    }
    this.uploadFile(files);
  }

  uploadFile(files: FileList) {
    Array.from(files).forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `fundani.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.documentsService.uploadFile(formData).subscribe(url => {
        this.dpUrl = `${environment.API_URL}/api/upload/${url}`;
        this.user.Dp = this.dpUrl;
        this.userService.updateUser(this.user).subscribe(data => {
          if (data.Dp) {
            console.log('uploaded successfully.')
          } else {
            this.error = data;
          }
        });
      });
    });
  }

  confirm() {
    this.accountService.updateUserState(this.user);
    this.openSnackBar('Dp Uploaded successfully.', 'Got it!');
    this.closeModal();
  }
  
  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });
  }
}
