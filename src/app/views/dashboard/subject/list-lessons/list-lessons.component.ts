import { Component, Input, OnInit } from '@angular/core';
import { TopicContent } from 'src/app/_models/topic.model';
import { AccountService, ApiService } from 'src/app/_services';
import { SAVE_COMMENT_URL, UPDATE_CONTENT_URL, ADD_CONTENT_URL } from 'src/app/_services/_shared';
import { environment } from 'src/environments/environment';
import { TopicComponent } from '../topic/topic.component';
import { DomSanitizer } from '@angular/platform-browser'
import { MatSnackBar } from '@angular/material';
import { ButtonActionModel } from 'src/app/_models';
import { ADD_ACTION } from 'src/app/_shared';


@Component({
  selector: 'app-list-lessons',
  templateUrl: './list-lessons.component.html',
  styleUrls: ['./list-lessons.component.scss']
})
export class ListLessonsComponent implements OnInit {
  @Input() lessons: TopicComponent[];
  @Input() subjectId: string;
  @Input() subjectName: string;
  showModal: boolean;
  isUpdate: boolean;
  modalHeading: string;
  tittle: any;
  contentBody: any;
  content: TopicContent;
  topic: any;
  user: any;
  contentType = 'Blog';
  showPreview: boolean;
  showDelete: boolean;
  index: number;
  error: string;
  description: string;
  current: TopicContent;
  htmlPreview: any;
  editorStyle = {
    height: '1500px',
    marginBottom: '30px',
  }
  showLoader: boolean;
  actionButtons: ButtonActionModel[] = [
    {
      actionType: ADD_ACTION,
      label: 'lesson'
    }
  ]
  constructor(
    private apiServices: ApiService,
    private accountService: AccountService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
  }
  add() {
    this.showModal = true;
    this.isUpdate = false;
    this.modalHeading = `Add Lesson | ${this.subjectName}`;
    this.tittle = undefined;
    this.contentBody = undefined;
    this.content = {
      TopicId: "n/a",
      SubjectId: this.subjectId,
      TopicContentId: "",
      Tittle: "",
      ContentType: "Blog",
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

  formatBody() {
    this.index = 0;
    this.content.Tittle = this.tittle;
    this.content.ContentBody = this.contentBody;
    this.content.ContentType = this.contentType;
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(this.content.ContentBody, 'text/html');
    const srcs = [];

    for (let i = 0; i < parsedHtml.getElementsByTagName("iframe").length; i++) {
      parsedHtml.getElementsByTagName("iframe")[i].style.width = '100%';
      parsedHtml.getElementsByTagName("iframe")[i].style.height = '35rem';
      parsedHtml.getElementsByTagName("iframe")[i].src = parsedHtml.getElementsByTagName("iframe")[i].src + '?rel=0';
    }

    for (let i = 0; i < parsedHtml.images.length; i++) {
      let src = parsedHtml.images[i].src;
      if (parsedHtml.images[i].src.includes("data:"))
        srcs.push(src);
    }
    this.apiServices.actionQuery("api/upload/upload-base-64.php", { images: srcs }).subscribe(data => {
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
    this.apiServices.actionQuery(SAVE_COMMENT_URL, data).subscribe(response => {
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
  save() {

    this.error = '';
    if (!this.tittle) {
      this.error = `⚠️ Enter  content tittle`;
      return false;
    }
    this.showLoader = true;
    if (this.isUpdate || this.showDelete) {

      this.apiServices.actionQuery(UPDATE_CONTENT_URL, this.content).subscribe(res => {
        this.showModal = false;
        this.tittle = '';
        this.description = '';
        this.content = null;
        this.showDelete = false;
        this.isUpdate = false;
        this.showLoader = false;
        this.openSnackBar('Lesson updated.', 'Success!');
      })
    } else {
      this.apiServices.actionQuery(ADD_CONTENT_URL, this.content).subscribe(res => {
        this.showModal = false;
        this.tittle = '';
        this.description = '';
        this.lessons.push(res);
        this.showLoader = false;
        this.openSnackBar('Lesson created.', 'Success!');
      })
    }
  }

  preview(item: TopicContent) {
    this.showPreview = true;
    this.current = item;
    this.modalHeading = 'Preview & comments';
    this.htmlPreview = this.sanitizer.bypassSecurityTrustHtml(this.current.ContentBody);
    this.htmlPreview = this.sanitizer.bypassSecurityTrustHtml(this.current.ContentBody);

  }

  edit() {
    this.showPreview = false;
    this.showModal = true;
    this.isUpdate = true;
    this.tittle = this.current.Tittle;
    this.contentType = this.current.ContentType;
    this.contentBody = this.current.ContentBody;
    this.content = this.current;
    this.modalHeading = 'Update Lesson.'
  }

  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });

  }

  imageChanged(event) {
    const files = event.target.files;
  }

  copyText() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `${environment.BASE_URL}/#/read/${this.current.TopicContentId}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.openSnackBar('Link copied to clipboard!', 'Ready to paste & share');

  }

  toggleReplies(comment) {
    comment.ShowReplies = !comment.ShowReplies;
  }

}
