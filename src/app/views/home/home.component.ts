import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AccountService } from 'src/app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
            this.routeTo.navigate([this.returnUrl]);
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }
}
