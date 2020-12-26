import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { ChangePasswordModel, CtaModel, TokenModel } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token;
  rForm: FormGroup;
  hidePassword = true;
  error: string;
  showLoader: boolean;
  showModal: boolean;
  ctaModel: CtaModel = {
    label: 'Go to Login',
    link: '/login',
    // tslint:disable-next-line: max-line-length
    message: 'Please login with your new credentials',
    header: 'Success!',
    icon: 'assets/images/home/correct.svg'
  };

  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private location: LocationStrategy,
    private accountService: AccountService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      Email: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      Password: [null, Validators.required],
      ConfirmPassword: [null, Validators.required]
    });
    const baseUrlMain: string = (this.location as any)._platformLocation.location.href;
    this.token = baseUrlMain.substring(baseUrlMain.indexOf('=') + 1);
    // verify user token
    this.getUserByToken();
  }

  getUserByToken() {
    this.showLoader = true;
    if (this.token === undefined) {
      this.openSnackBar('You should not be here, please contact support!', 'Forbidden!');
      this.routeTo.navigate(['']);
    }

    const tokenModel: TokenModel = { Token: this.token };
    this.accountService.getUserByToken(tokenModel).subscribe(data => {
      if (data) {
        this.showLoader = false;
      } else {
        this.openSnackBar('You should not be here, please contact support!', 'Forbidden!');
        this.routeTo.navigate(['']);
      }
    });
  }

  onSubmit(model: ChangePasswordModel) {
    this.error = undefined;
    this.showLoader = true;
    if (model.ConfirmPassword !== model.Password) {
      this.error = 'Password(s) must match!';
      this.showLoader = false;
      return;
    }
    this.accountService.changePassword(model).subscribe(data => {
      if (data) {
        this.openSnackBar('Please login with your new credentials', 'Success!');
        this.routeTo.navigate(['sign-in']);
      } else {
        this.openSnackBar('Something went wrong, please try again later!', 'Error!');
        this.routeTo.navigate(['']);
      }
    });
  }


  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });
  }
}
