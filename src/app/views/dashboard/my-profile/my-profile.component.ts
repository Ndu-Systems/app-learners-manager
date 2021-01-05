import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BreadCrumbModel, ButtonActionModel, HeaderBannerModel } from 'src/app/_models';
import { User } from 'src/app/_models/user.model';
import { AccountService, EmailService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';
import { DELETE_ACTION, SAVE_ACTION } from 'src/app/_shared';

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
  actionButtons: ButtonActionModel[] = [
    {
      actionType: 'save',
      label: 'profile'
    },
    {
      actionType: 'delete',
      label: 'profile'
    },
  ]
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

  onClickedAction($event) {
    if ($event === SAVE_ACTION) {
      alert('Perform save action');
    }
    if ($event === DELETE_ACTION) {
      alert('Perform delete action');
    }
  }
}
