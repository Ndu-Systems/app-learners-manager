import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BreadCrumbModel, HeaderBannerModel } from 'src/app/_models';
import { User } from 'src/app/_models/user.model';
import { AccountService, EmailService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  crumbs: BreadCrumbModel[] = [
    {
      Label: 'grades',
      Link: '/dashboard/grades'
    },
    {
      Label: 'My Profile',
      Link: '/dashboard/profile'
    },
  ];
  user: User;

  headerBanner: HeaderBannerModel = {
    Header: 'Your profile',
    SubHeader: 'You profile information.'
  };
  hidePassword = true;
  constructor(
    private accountService: AccountService,
    private emailService: EmailService,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;

  }

}
