import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TopicContent } from 'src/app/_models/topic.model';

@Component({
  selector: 'app-lesson-preview',
  templateUrl: './lesson-preview.component.html',
  styleUrls: ['./lesson-preview.component.scss']
})
export class LessonPreviewComponent implements OnInit {
  @Input() modalHeading: string;
  @Input() showPreview: boolean;
  @Input() current: TopicContent;
  @Input() htmlPreview: any;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() copyText: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() reply: EventEmitter<any> = new EventEmitter<any>();
  @Output() post: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  closeModal() {
    this.close.emit(true);
  }
  update() {
    this.edit.emit(true);
  }

  share() {
    this.copyText.emit(true);
  }
  replyMessage(comment) {
    this.reply.emit(comment);
  }

  postComment(comment) {
    this.post.emit(comment);
  }
  toggleReplies(comment) {
    this.toggle.emit(comment);
  }
}
