import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicContent } from 'src/app/_models/topic.model';
import { AccountService, ApiService } from 'src/app/_services';
import { GET_LESSON_URL, SAVE_COMMENT_URL } from 'src/app/_services/_shared';
import { DomSanitizer } from '@angular/platform-browser'
import { User } from 'src/app/_models/user.model';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  LessonId: any;
  lesson: any;
  htmlPreview: any;
  user: User;
  comment: any;
  parentId: any;
  showLogin: boolean;
  action: string;

  constructor(
    private apiServices: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private accountService: AccountService,

  ) {
    this.activatedRoute.params.subscribe(r => {
      this.LessonId = r.id;
    });
  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.apiServices.get(`${GET_LESSON_URL}?SubjectId=${this.LessonId}`).subscribe(data => {
      if (data) {
        this.lesson = data;
        this.preview(this.lesson);

      }
    });
  }

  preview(item: TopicContent) {
    this.htmlPreview = this.sanitizer.bypassSecurityTrustHtml(item.ContentBody);
  }

  back() {
    this.router.navigate(['']);
  }

  toggleReplies(comment) {
    comment.ShowReplies = !comment.ShowReplies;
  }
  reply(comment) {
    if (!this.user) {
      this.showLogin = true;
      return false;
    }
    comment.ShowReply = true;
  }
  postComment(comment) {
    if (!comment) {
      return false;
    }
    console.log(comment);

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
        console.log('comment', response);
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

  postNewComment() {
    if (!this.comment) {
      return false;
    }

    if (!this.user) {
      this.showLogin = true;
      this.action = 'post-new';
      return false;
    }

    const data = {
      OtherId: this.lesson.TopicContentId,
      ParentId: '',
      Name: this.comment,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }
    this.apiServices.add(SAVE_COMMENT_URL, data).subscribe(response => {
      if (response) {
        console.log('comment', response);
        if (!this.lesson.Comments) {
          this.lesson.Comments = [];
        }
        response.User = this.user;
        response.Replies = [];
        this.lesson.Comments.push(response);
        this.comment = undefined;
        this.parentId = '';
        this.action = undefined;
      }


    });

  }

  userDoneLoginIn(user) {
    this.user = user;
    this.showLogin = false;
    if (this.action === 'post-new') {
      this.postNewComment();
    }
    // this.backClicked();
  }

}
