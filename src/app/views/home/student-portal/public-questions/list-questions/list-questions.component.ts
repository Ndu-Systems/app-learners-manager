import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AccountService, ApiService } from 'src/app/_services';
import { User } from 'src/app/_models/user.model';
import { GET_PUBLIC_QUESTIONS_URL, SAVE_STUDENT_CONTENT_URL } from 'src/app/_services/_shared';
import { PublicQuestion } from 'src/app/_models/public.question.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss']
})
export class ListQuestionsComponent implements OnInit {
  user: User;
  questions: PublicQuestion[];
  question: PublicQuestion;
  constructor(
    private _location: Location,
    private accountService: AccountService,
    private apiServices: ApiService,
    private router: Router,


  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (this.user) {
      this.apiServices.get(`${GET_PUBLIC_QUESTIONS_URL}?GradeId=${this.user.GradeId}`).subscribe(response => {
        console.log(response);
        if (response) {
          this.questions = response;
        }
      });
    }
  }
  backClicked() {
    this._location.back();
  }
  view(item: PublicQuestion) {
    // this.router.navigate(['question', item.PublicQuestionId]);
    this.questions.map(x=>x.Class=['details']);
    this.question = item;
    item.Class = ['details','active']
  }
}
