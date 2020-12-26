import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { AccountService, ApiService } from 'src/app/_services';
import { SAVE_COMMENT_URL } from 'src/app/_services/_shared';

@Component({
  selector: 'app-home-comments',
  templateUrl: './home-comments.component.html',
  styleUrls: ['./home-comments.component.scss']
})
export class HomeCommentsComponent implements OnInit {
  @Input() comments: any[];
  @Input() otherId: string[];
  comment: any;
  user: User;
  parentId: string = '';
  portalService: any;
  constructor(
    private accountService: AccountService,
    private apiServices: ApiService
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
  }
  postComment() {
    if (!this.comment) {
      return false;
    }

    const data = {
      OtherId: this.otherId,
      ParentId: this.parentId,
      Name: this.comment,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }
    this.apiServices.actionQuery(SAVE_COMMENT_URL, data).subscribe(response => {
      if (response) {
        if (!this.comments) {
          this.comments = [];
        }
        response.User = this.user;
        this.comments.push(response);
        this.comment = undefined;
        this.parentId = '';
      }


    });

  }
  reply(comment) {
    comment.ShowReply = true;
    this.parentId = comment.ParentId
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

  
  toggleReplies(comment) {
    comment.ShowReplies = !comment.ShowReplies;
  }

}
