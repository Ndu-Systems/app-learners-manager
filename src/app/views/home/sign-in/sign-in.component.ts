import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  rForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private route: ActivatedRoute,
    private authenticationService: AccountService
  ) {
    // redirect to dashboard if already logged in.
    if (this.authenticationService.currentUserValue) {
      this.routeTo.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.rForm = this.fb.group({
      Email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      Password: [null, Validators.required]
    });

    // get return url from route parameters or default to dashboard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
  }

  // convinient for easy form(rForm) data access
  get f() { return this.rForm.controls; }
  login() {
    this.submitted = true;
    this.loading = true;

    this.authenticationService
      .login(this.f.Email.value, this.f.Password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.routeTo.navigate(['dashboard']);
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }
}
