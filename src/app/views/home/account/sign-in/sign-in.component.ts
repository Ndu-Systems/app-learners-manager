import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { ADMIN, LEARNER, TEACHER } from 'src/app/_shared';
import { LocationStrategy } from '@angular/common';
import { NavigationModel, TokenModel } from 'src/app/_models';
import { MatSnackBar } from '@angular/material';
import { NavigationService } from 'src/app/_services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  showMobileNav;
  rForm: FormGroup;
  error: string;
  loading$: Observable<boolean>;
  email = environment.ACCOUNT_TEST_EMAIL;
  password = environment.ACCOUNT_TEST_PASSWORD;
  hidePassword = true;
  shopSecondaryColor;
  shopPrimaryColor;
  logoUrl;
  token: string;
  returnUrl: string;
  showLoader: boolean = false;
  navigationModel: NavigationModel;

  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private location: LocationStrategy,
    private _snackBar: MatSnackBar,
    private navigationService: NavigationService,

  ) {
  }


  ngOnInit() {
    this.rForm = this.fb.group({
      Email: new FormControl(
        this.email,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      Password: [this.password, Validators.required]
    });
    this.loading$ = this.accountService.loading;
    const baseUrlMain: string = (this.location as any)._platformLocation.location.href;
    this.token = baseUrlMain.substring(baseUrlMain.indexOf('=') + 1);
    if (!this.token.includes('http')) {
      this.activateUser();
    }
  }

  activateUser() {
    const tokenModel: TokenModel = { Token: this.token };
    if (tokenModel.Token) {
      this.accountService.activateUser(tokenModel)
        .subscribe(data => {
          if (data > 0) {
            const message = 'Account successfully activated, Please Set your password.';
            this.openSnackBar(message, 'Got It!');
            this.routeTo.navigate(['reset-password']);
          }
        });
    }
  }

  get getFormValues() {
    return this.rForm.controls;
  }

  Login() {
    const email = this.getFormValues.Email.value;
    const password = this.getFormValues.Password.value;
    this.showLoader = true;

    this.accountService.login({ email, password }).subscribe(user => {
      if (user && user.UserId) {
        this.error = '';
        this.accountService.updateUserState(user);
        let userRoles = user.Roles;


        if (userRoles) {
          if (user.Roles.find(x => x.RoleName === ADMIN || TEACHER)) {
            setTimeout(() => {
              this.showLoader = false;
              this.navigationModel = {
                IsDashboard: true,
                NavUrl: 'grades',
                Title: `View Grades/Levels`
              };
              this.navigationService.updateNavigationState(this.navigationModel);
              this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'dashboard/grades';
              this.routeTo.navigate([this.returnUrl]);
            }, 1500);
          }
          if (user.Roles.find(x => x.RoleName === LEARNER)) {
            setTimeout(() => {
              this.showLoader = false;
              this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/my-portal';
              this.routeTo.navigate([this.returnUrl]);
            }, 1500);

          }
        }

        if (!userRoles) {
          this.showLoader = false;

          const message = 'User have no roles';
          this.openSnackBar(message, 'Forbidden!');
          this.routeTo.navigate(['']);
        }

      }
      else {
        let err: any = user;
        this.error = err + '. , Or contact us if you did not get the mail.' || 'your email or password is incorrect';
        this.showLoader = false;
      }
    })
  }


  toggleNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });
  }
}
