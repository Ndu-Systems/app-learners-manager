import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PortalService } from 'src/app/_services/portal.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AccountService, ApiService } from 'src/app/_services';
import { User } from 'src/app/_models/user.model';
import { TopicContent } from 'src/app/_models/topic.model';
import { SAVE_STUDENT_CONTENT_URL, SAVE_COMMENT_URL } from 'src/app/_services/_shared';

@Component({
  selector: 'app-read-topic',
  templateUrl: './read-topic.component.html',
  styleUrls: ['./read-topic.component.scss']
})
export class ReadTopicComponent implements OnInit {
  htmlPreview: any;
  content: TopicContent;
  user: User;
  comment: string;
  parentId = '';
  constructor(
    private sanitizer: DomSanitizer,
    private portalService: PortalService,
    private router: Router,
    private _location: Location,
    private accountService: AccountService,
    private apiServices: ApiService,
  ) { }

  ngOnInit() {
    this.content = this.portalService.getCurrentTopicContent;
    this.user = this.accountService.currentUserValue;
    if (this.content) {
      this.htmlPreview = this.sanitizer.bypassSecurityTrustHtml(this.content.ContentBody);
      this.htmlPreview = this.sanitizer.bypassSecurityTrustHtml(this.content.ContentBody);
    }

  }
  backClicked() {
    this._location.back();
  }

  finishReading() {
    const data = {
      UserId: this.user.UserId,
      TopicContentId: this.content.TopicContentId,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }

    this.apiServices.add(SAVE_STUDENT_CONTENT_URL, data).subscribe(response => {
      this.backClicked();

    });
  }

  reply(comment) {
    comment.ShowReply = true;
    this.parentId = comment.ParentId
  }

  postComment() {
    if (!this.comment) {
      return false;
    }

    const data = {
      OtherId: this.content.TopicContentId,
      ParentId: this.parentId,
      Name: this.comment,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }
    this.apiServices.add(SAVE_COMMENT_URL, data).subscribe(response => {
      if (response) {
        if (!this.content.Comments) {
          this.content.Comments = [];
        }
        response.User = this.user;
        this.content.Comments.push(response);
        this.comment = undefined;
        this.parentId = '';
      }


    });

  }

  postReplyComment(comment) {
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

  
  toggleReplies(comment) {
    comment.ShowReplies = !comment.ShowReplies;
  }

}
