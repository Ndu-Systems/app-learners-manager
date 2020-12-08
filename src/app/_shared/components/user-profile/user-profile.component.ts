import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Email } from 'src/app/_models/email.model';
import { User } from 'src/app/_models/user.model';
import { ApiService, EmailService } from 'src/app/_services';
import { STATUS_PENDING_PAYMENTS, STATUS_ACTIVE, UPDATE_USER_URL } from 'src/app/_services/_shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() user: User;
  @Input() userType: string;
  current: User;
  showModal: boolean;
  showConfirm: boolean;
  modalHeading: string;
  modalBody: string;
  modalCTA: string;
  showLoader: boolean;
  constructor(
    private emailService: EmailService,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }
  learnerStatusChanged(user: User) {
    this.current = user;
    this.showModal = true;
    this.showConfirm = true;
    this.modalHeading = `Update  ${this.userType} access`;
    if (Number(user.StatusId) === STATUS_PENDING_PAYMENTS) {
      this.modalBody = `The ${this.userType} access will be locked`;
      this.modalCTA = `Lock ${this.userType} access`;
    }
    if (Number(user.StatusId) === STATUS_ACTIVE) {
      this.modalBody = `The ${this.userType} access will activated!`;
      this.modalCTA = `Grant ${this.userType} access`;
    }
  }

  updateStatus() {
    this.current.Studentsubjects = [];
    this.current.Grade = null;
    this.showLoader = true;
    this.apiServices.add(UPDATE_USER_URL, this.current).subscribe(res => {
      if (Number(this.current.StatusId) === STATUS_PENDING_PAYMENTS) {
        this.modalBody = `The ${this.userType} access will be locked`;
        this.modalCTA = `Lock ${this.userType} access`;

        this.sendEmail(
          'Bad news ! You account was locked!',
          'Please make the payment and upload proof of payment',
          this.current
        );
      }
      if (Number(this.current.StatusId) === STATUS_ACTIVE) {
        this.sendEmail(
          'Congratulations! You access was granted!',
          'your account has been unlocked, enjoy studying',
          this.current
        );
      }
      this.closeModal()
      this.ngOnInit();
    })
  }

  cancelStatusChange() {
    this.closeModal();
    this.ngOnInit();
  }

  closeModal() {
    this.showModal = false;
    this.showConfirm = false;
  }

  sendEmail(subject, body, data: User) {
    const emailToSend: Email = {
      Email: data.Email,
      Subject: subject,
      Message: body,
      Link: environment.BASE_URL,
      UserFullName: data.Name
    };
    this.showLoader = true;
    this.emailService.sendGenarlTextEmail(emailToSend)
      .subscribe(response => {
        if (response > 0) {
         const message = 'User saved,  And email was send to ' + data.Name;
          this.openSnackBar(message, 'Success!');

        }
      });
  }

  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 3000
    });

  }

}
