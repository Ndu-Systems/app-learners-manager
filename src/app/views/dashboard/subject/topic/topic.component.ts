import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { User } from 'src/app/_models/user.model';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { GET_SUBJECT_URL, ADD_TOPIC_URL, GET_TOPIC_URL, ADD_CONTENT_URL, UPDATE_CONTENT_URL, STATUS_DELETED, SAVE_COMMENT_URL } from 'src/app/_services/_shared/constants';
import { environment } from 'src/environments/environment';
import { DocumentsService } from 'src/app/_services/documents.service';
import { TopicContent, Topic } from 'src/app/_models/topic.model';
import { BreadCrumbModel, HeaderBannerModel } from 'src/app/_models';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  // styles: ['img {width: 96%}'],
})
export class TopicComponent implements OnInit {
  editorStyle = {
    height: '320px',
    marginBottom: '30px',
  }
  // editorConfig = {
  //   tools: {

  //   }
  // }
  // <quill-editor [styles]="editorStyle" [modules] = "editorConfig" [(ngModel)]="contentBody">

  showModal: boolean;
  TopicId: string;
  user: User;
  description = '';
  error: string;
  contentType = 'Blog';
  tittle: any;
  contentBody: any;
  imageUrl: string;
  topicContentList: TopicContent[];
  topic: Topic;
  modalHeading = ' Add new content';
  current: TopicContent;
  isUpdate: boolean;
  showDelete: boolean;
  showPreview: boolean;
  htmlPreview: any;
  crumbs: BreadCrumbModel[] = [];
  headerBanner: HeaderBannerModel = {
    Header: 'Topic content',
    SubHeader: 'A collection of content in the system.',
    ctaLabel: '+ Add a content'
  };
  content: TopicContent;
  uplaoding: boolean;
  index = 0;
  constructor(
    private apiServices: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private documentsService: DocumentsService,
    private sanitizer: DomSanitizer
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.TopicId = r.id;

    });
  }

  ngOnInit() {
    this.apiServices.get(`${GET_TOPIC_URL}?TopicId=${this.TopicId}`).subscribe(data => {
      if (data) {
        this.topic = data;
        this.topicContentList = this.topic.TopicContent;
        this.headerBanner.Header = `${this.topic.Name} content `
        this.headerBanner.SubHeader = `A collection of ${this.topic.Name} content in the system.,`

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
            Label: `${this.topic.Subject.Grade.Name}`,
            Link: `/dashboard/subjects/${this.topic.Subject.Grade.GradeId}`
          },
          {
            Label: `${this.topic.Subject.Name}`,
            Link: `/dashboard/subject/${this.topic.Subject.SubjectId}`
          },
          {
            Label: `${this.topic.Name} `
          },
        ];
      }
    });
    this.user = this.accountService.currentUserValue;

  }
  add() {
    this.showModal = true;
    this.isUpdate = false;
    this.modalHeading = 'Add new content';
    this.tittle = undefined;
    this.contentBody = undefined;
    this.content = {
      TopicId: this.topic.TopicId,
      TopicContentId: "",
      Tittle: "",
      ContentType: "",
      ContentBody: "",
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1,
    }
  }
  closeModal() {
    this.showModal = false;
    this.showPreview = false;
    this.showDelete = false;
  }
  open(id) {
    this.router.navigate(['dashboard/topic', id]);
  }
  closeOptions() {
    this.topicContentList.map(x => x.Viewing = false);
  }
  save() {

    this.error = '';
    if (!this.tittle) {
      this.error = `⚠️ Enter  content tittle`;
      return false;
    }
    if (this.isUpdate || this.showDelete) {

      this.apiServices.add(UPDATE_CONTENT_URL, this.content).subscribe(res => {
        this.showModal = false;
        this.tittle = '';
        this.description = '';
        this.ngOnInit();
        this.content = null;
        this.showDelete = false;
        this.isUpdate = false;
      })
    } else {
      this.apiServices.add(ADD_CONTENT_URL, this.content).subscribe(res => {
        this.showModal = false;
        this.tittle = '';
        this.description = '';
        this.ngOnInit();
      })
    }
  }


  goto(url) {
    this.router.navigate([`dashboard/${url}`])
  }



  imageChanged(event) {
    const files = event.target.files;
    this.uplaodFile(files);

  }


  uplaodFile(files: FileList) {
    if (!files.length) {
      return false;
    }

    Array.from(files).forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `tybo.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.documentsService.uploadFile(formData).subscribe(url => {
        this.contentBody = `${environment.API_URL}/api/upload/${url}`;
      });

    });

  }


  options(item: TopicContent) {
    this.topicContentList.map(x => x.Viewing = false);
    item.Viewing = true;
  }
  delete(item: TopicContent) {
    this.showDelete = true;
    this.tittle = item.Tittle;
    this.current = item;
    this.current.StatusId = STATUS_DELETED;
    this.modalHeading = `${item.Tittle}  will be deleted, continue?`
    this.topicContentList.map(x => x.Viewing = false);
  }
  edit(item: TopicContent) {
    this.showModal = true;
    this.isUpdate = true;
    this.tittle = item.Tittle;
    this.contentType = item.ContentType;
    this.contentBody = item.ContentBody;
    this.content = item;
    this.modalHeading = 'Update topic.'
    this.topicContentList.map(x => x.Viewing = false);
  }

  preview(item: TopicContent) {
    this.showPreview = true;
    this.current = item;
    this.modalHeading = 'Preview & comments';
    this.htmlPreview = this.sanitizer.bypassSecurityTrustHtml(this.current.ContentBody);
    this.htmlPreview = this.sanitizer.bypassSecurityTrustHtml(this.current.ContentBody);

  }
  changed(event) {
    if (this.contentBody && this.contentBody.length > 65535) {
      // alert('Image is to big sir!')
    }

  }

  formatBody() {
    this.index = 0;
    this.content.Tittle = this.tittle;
    this.content.ContentBody = this.contentBody;
    this.content.ContentType = this.contentType;
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(this.content.ContentBody, 'text/html');

    const srcs = [];
    for (let i = 0; i < parsedHtml.images.length; i++) {
      let src = parsedHtml.images[i].src;
      if (parsedHtml.images[i].src.includes("data:"))
        srcs.push(src);
    }
    this.apiServices.add("api/upload/upload-base-64.php", { images: srcs }).subscribe(data => {
      if (data) {
        data.forEach(link => {
          parsedHtml.images[this.index].src = `${environment.API_URL}/api/upload/${link}`;
          parsedHtml.images[this.index].setAttribute("width", "100%");
          this.index++;
        });
      }
      const body = parsedHtml.documentElement.innerHTML
      this.content.ContentBody = body;
      this.contentBody = body;
      this.save();
    });

  };

  reply(comment) {
    comment.ShowReply = true;
  }


  postComment(comment) {
    if (!comment) {
      return false;
    }

    const data = {
      OtherId: comment.OtherId,
      ParentId: comment.CommentId,
      Name: comment.Reply,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }
    this.apiServices.add(SAVE_COMMENT_URL, data).subscribe(response => {
      if (response) {
        if (!comment.Replies) {
          comment.Replies = [];
        }
        response.User = this.user;
        comment.Replies.push(response);
        comment.Reply = undefined;
        comment.ShowReply = false;
      }


    });

  }
}

