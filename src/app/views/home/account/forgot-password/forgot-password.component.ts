import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailGetRequestModel, Email, CtaModel } from 'src/app/_models';
import { EmailService, AccountService } from 'src/app/_services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  rForm: FormGroup;
  error;
  showLoader: boolean;
  showModal: boolean;
  hidePassword: boolean;
  ctaModel: CtaModel = {
    label: 'Go home',
    link: '',
    // tslint:disable-next-line: max-line-length
    message: 'Your account has been verified, please check your email.',
    header: 'Reset Password, Verified!',
    icon: 'assets/images/home/correct.svg'
  };
  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private emailService: EmailService
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      Email: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.email
        ]))
    });
  }

  onSubmit(model: EmailGetRequestModel) {
    this.showLoader = true;
    this.accountService.generateToken(model).subscribe(data => {
      if (data.UserToken) {
        const email: Email = {
          Email: model.Email,
          Subject: 'Forgot Password: Reset',
          Message: '',
          Link: this.accountService.generateForgotPasswordReturnLink(data.UserToken)
        };
        this.emailService.sendResetPasswordEmail(email).subscribe(response => {
          if (response > 0) {
            setTimeout(() => {
              this.showLoader = false;
              this.showModal = true;
              alert('Success: 1000,Your account has been verified, please check your email.');
              this.routeTo.navigate(['sign-in']);
            }, 0);
          } else {
            // this.showLoader = false;
            // this.ctaModel.icon = 'assets/images/error.svg';
            // this.ctaModel.header = 'Oops, error';
            // this.ctaModel.message = 'Something went wrong, please try again later!';
            // this.showModal = true;
            alert('Error: 1003,Something went wrong, please try again later!');
            this.routeTo.navigate(['']);
            return;
          }
        });
      } else {
        // this.showLoader = false;
        // this.ctaModel.icon = 'assets/images/error.svg';
        // this.ctaModel.header = 'Oops, error';
        // this.ctaModel.message = 'Something went wrong, please try again later!';
        // this.showModal = true;
        alert('Error: 1003,Something went wrong, please try again later!');
        this.routeTo.navigate(['']);
      }
    });
  }
}
