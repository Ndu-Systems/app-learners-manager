import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { GET_SUBJECTS_FOR_A_GRADE_URL, ADD_SUBJECT_URL, GET_SUBJECT_URL, ADD_TOPIC_URL, STATUS_DELETED, UPDATE_TOPIC_URL } from 'src/app/_services/_shared/constants';
import { Subject } from 'src/app/_models/grade.model';
import { Topic } from 'src/app/_models/topic.model';
import { BreadCrumbModel, HeaderBannerModel } from 'src/app/_models';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  showModal: boolean;
  name: string;
  SubjectId: string;
  subject: Subject;
  topics: Topic[];
  user: User;
  description = '';
  error: string;
  modalHeading = 'Add new topic';
  current: Topic;
  isDelete: boolean;
  isUpdate: boolean;
  crumbs: BreadCrumbModel[] = [];
  headerBanner: HeaderBannerModel = {
    Header: 'Subject Topics',
    SubHeader: 'A collection of topics in the system.',
    ctaLabel: '+ Add a topic'
  };
  constructor(
    private apiServices: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.SubjectId = r.id;
    });
  }

  ngOnInit() {
    this.apiServices.get(`${GET_SUBJECT_URL}?SubjectId=${this.SubjectId}`).subscribe(data => {
      if (data) {
        this.subject = data;
        this.topics = this.subject.Topics;
        this.headerBanner.Header = `Topics for ${this.subject.Name}`
        this.headerBanner.SubHeader= `A collection of ${this.subject.Name} topics in the system.,`

        this.crumbs = [
          {
            Label: 'dashboard',
            Link: '/dashboard'
          },
          {
            Label: 'All Grades',
            Link: '/dashboard/grades'
          },
          {
            Label: `${this.subject.Grade.Name}`,
            Link: `/dashboard/subjects/${this.subject.Grade.GradeId}`
          },
          {
            Label: ` Topics for ${this.subject.Name} `
          },
        ];

      }
    });
    this.user = this.accountService.currentUserValue;
    this.showModal = false;
    this.current = undefined;
    this.isDelete = false;
    this.isUpdate = false;
  }
  add() {
    this.showModal = true;
    this.current = undefined;
    this.modalHeading =  'Add new topic';
    this.isDelete = false;
    this.isUpdate = false;
  }
  closeModal() {
    this.showModal = false;
    this.isDelete = false;
  }
  open(id) {
    this.router.navigate(['dashboard/topic', id]);
  }

  save() {
    const data = {
      SubjectId: this.SubjectId,
      Name: this.name,
      ImageUrl: "",
      Description: this.description,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    };
    this.error = '';
    if (!this.name) {
      this.error = `⚠️ Enter topic name`;
      return false;
    }
    const findTipic = this.subject.Topics.find(x => x.Name.toLocaleLowerCase() === this.name.toLocaleLowerCase());
    if (findTipic &&  !this.isDelete && !this.isUpdate) {
      this.error = `⚠️  ${this.name} already exist.`;
      return false;
    }
    if (this.isDelete || this.isUpdate) {
      this.current.Name = this.name;
      this.current.Description = this.description;
      this.apiServices.add(UPDATE_TOPIC_URL, this.current).subscribe(res => {
        this.showModal = false;
        this.name = '';
        this.description = '';
        this.ngOnInit();
      })
    } else {
      this.apiServices.add(ADD_TOPIC_URL, data).subscribe(res => {
        this.showModal = false;
        this.name = '';
        this.description = '';
        this.ngOnInit();
      })
    }
  }

  goto(url) {
    this.router.navigate([`dashboard/${url}`])
  }
  options(item: Topic) {
    this.topics.map(x => x.Viewing = false);
    item.Viewing = true;
  }
  delete(item: Topic) {
    this.isDelete = true;
    this.name = item.Name;
    this.current = item;
    this.current.StatusId = STATUS_DELETED;
    this.modalHeading = `${item.Name}  will be deleted, continue?`
    this.topics.map(x => x.Viewing = false);
  }
  edit(item: Topic) {
    this.showModal = true;
    this.isUpdate = true;
    this.name = item.Name;
    this.description = item.Description;
    this.current = item;
    this.modalHeading = 'Update subject.'
    this.topics.map(x => x.Viewing = false);
  }
}
