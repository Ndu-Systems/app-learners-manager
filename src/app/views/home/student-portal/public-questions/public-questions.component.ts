import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PublicQuestion } from 'src/app/_models/public.question.model';
import { User } from 'src/app/_models/user.model';
import { ApiService } from 'src/app/_services';
import { ADD_PUBLIC_QUESTION_URL } from 'src/app/_services/_shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-questions',
  templateUrl: './public-questions.component.html',
  styleUrls: ['./public-questions.component.scss']
})
export class PublicQuestionsComponent implements OnInit {
  @Input() subjects;
  @Input() user: User;
  showModal: boolean;
  showAskQuestion: boolean;
  modalHeading: string;
  publicQuestion: PublicQuestion
  subjectId: any;
  tittle: any;
  questionBody: any;
  index: number;
  error: string;
  editorStyle = {
    height: '1500px',
    marginBottom: '30px',
  }

  constructor(
    private apiServices: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router,

  ) { }

  ngOnInit() {
  }

  askQuestion() {
    this.showModal = true;
    this.showAskQuestion = true;
    this.modalHeading = 'Ask a public question';
    this.publicQuestion = {
      Tittle: '',
      GradeId: '',
      SubjectId: '',
      QuestionBody: '',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1,
    }
  }

  closeModal() {
    this.showModal = false;
    this.showAskQuestion = false;
  }

  formatBody() {
    if (!this.subjectId) {
      this.openSnackBar('Please select subject for this question!',
        '⛔️ Stop!');
      return false;
    }
    if (!this.tittle) {
      this.openSnackBar('Please enter a tittle for this question!', '⛔️ Stop!');
      return false;
    }
    if (!this.questionBody) {
      this.openSnackBar('Please enter a question', '⛔️ Stop, you did not ask anything!');
      return false;
    }
    this.publicQuestion.Tittle = this.tittle;
    this.publicQuestion.GradeId = this.user.GradeId;
    this.publicQuestion.SubjectId = this.subjectId;
    this.publicQuestion.QuestionBody = this.questionBody;
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(this.publicQuestion.QuestionBody, 'text/html');
    const srcs = [];
    this.index = 0;

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
      this.publicQuestion.QuestionBody = body;
      this.questionBody = body;
      this.postPublicQuestion();
    });

  }
  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });

  }

  postPublicQuestion() {
    console.log(this.publicQuestion);
    this.apiServices.actionQuery(ADD_PUBLIC_QUESTION_URL, this.publicQuestion).subscribe(data => {
      console.log(data);

    })
  }

  gotToAllQuestions() {
    this.router.navigate(['questions-hub']);
  }

}
