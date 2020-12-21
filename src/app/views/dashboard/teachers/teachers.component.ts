import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadCrumbModel, HeaderBannerModel, Email } from 'src/app/_models';
import { User } from 'src/app/_models/user.model';
import { ApiService, AccountService, EmailService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';
import { STATUS_PENDING_PAYMENTS, STATUS_ACTIVE, UPDATE_USER_URL } from 'src/app/_services/_shared';
import { ADMIN, TEACHER } from 'src/app/_shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  users: User[] = [];
  showModal: boolean;
  name: any;
  user: User;
  description = '';
  error: string;
  modalHeading = 'Add Teacher';
  isUpdate: boolean;
  current: User;
  showLoader: boolean;
  crumbs: BreadCrumbModel[] = [
    {
      Label: 'grades',
      Link: '/dashboard/grades'
    },
    {
      Label: 'All Teacher',
      Link: '/dashboard/teachers'
    },
  ];

  headerBanner: HeaderBannerModel = {
    Header: 'Teachers',
    SubHeader: 'A collection of teachers for your  organization.',
    ctaLabel: '+ Add Teacher'
  };
  showConfirm: boolean;
  modalBody: string;
  modalCTA: string;
  proofOfPayment: string;
  showAddLearner: boolean;
  isAdmin: boolean;

  constructor(
    private apiServices: ApiService,
    private router: Router,
    private accountService: AccountService,
    private emailService: EmailService,
    private userService: UserService,

  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (this.user.UserType === ADMIN) {
      this.isAdmin = true;
    }
    this.userService.userListObservable.subscribe(data=>{
      this.users = data;
    });
    this.userService.getUsers(this.user.CompanyId, TEACHER);
  }
  add() {
    this.showModal = true;
    this.showAddLearner = true;
    this.isUpdate = false;
    this.name = undefined;
    this.modalHeading = 'Add teacher';
  }
  closeModal() {
    this.showModal = false;
    this.showAddLearner = false;
    this.showConfirm = false;
    this.proofOfPayment = undefined;
  }

  open(id) {
    this.router.navigate(['dashboard/subjects', id]);
  }

  goto(url) {
    this.router.navigate([`dashboard/${url}`])
  }

  options(item: User) {
    this.users.map(x => x.Viewing = false);
    item.Viewing = true;
  }
  delete(item: User) {
    this.users.map(x => x.Viewing = false);
  }
  edit(item: User) {
    this.showModal = true;
    this.isUpdate = true;
    this.name = item.Name;
    this.modalHeading = 'Update grade.'
    this.users.map(x => x.Viewing = false);
  }



  updateStatus() {
    this.current.Studentsubjects = [];
    this.current.Grade = null;
    this.showLoader = true;
    this.apiServices.add(UPDATE_USER_URL, this.current).subscribe(res => {
      if (Number(this.current.StatusId) === STATUS_PENDING_PAYMENTS) {
        this.modalBody = `The student access will be locked`;
        this.modalCTA = `Lock student access`;

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

  openPP(proofOfPayment: string) {
    if (proofOfPayment) {
      this.showModal = true;
      this.proofOfPayment = proofOfPayment;
    }
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
          alert('User saved,  And email was send to ' + data.Name);
        }
      });
  }

  doneAdding(student: User) {
    if (student && student.UserId) {
      this.users.push(student);
      this.closeModal();
      this.ngOnInit();
    }
  }
  view(user: User) {
    user.Grades = [];
    this.router.navigate(['dashboard/view-teacher', user.UserId]);
  }
}
