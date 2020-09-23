import { Component, OnInit } from '@angular/core';
import { PortalService } from 'src/app/_services/portal.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Tests, Answer } from 'src/app/_models/tests.model';
import { StudentTest } from 'src/app/_models/student.test';
import { User } from 'src/app/_models/user.model';
import { AccountService, ApiService } from 'src/app/_services';
import { SAVE_STUDENT_TEST_URL } from 'src/app/_services/_shared/constants';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.scss']
})
export class TakeTestComponent implements OnInit {

  htmlPreview: any;
  test: Tests;
  user: User;
  modalHeading = 'Please answer all questions⛔️ ';
  showModal: boolean;
  showError: boolean;
  showResults: boolean;
  yourScore: number;
  constructor(
    private portalService: PortalService,
    private router: Router,
    private _location: Location,
    private accountService: AccountService,
    private apiServices: ApiService,

  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.test = this.portalService.getCurrentTest;


  }
  backClicked() {
    let studentTest: StudentTest = {
      StudentTestId: '',
      UserId: this.user.UserId,
      TestId: this.test.TestId,
      Score: 0,
      ModifyUserId: this.user.UserId,
      CreateUserId: this.user.UserId,
      StatusId: 1,
      Answers: []
    }
    let score = 0;
    let questions = 0;
    let unAnswered = [];
    if (this.test) {
      if (this.test.Sections) {
        this.test.Sections.forEach(section => {
          section.Questions.forEach(question => {
            questions++;

            if (!question.Answers.find(x => x.StudentAnswer)) {
              unAnswered.push(question);
            }
            question.Answers.forEach(answer => {
              if (answer.StudentAnswer) {
                studentTest.Answers.push({ StudentAnswerId: '', QuestionId: question.QuestionId, AnswerId: answer.AnswerId, UserId: this.user.UserId });
                if (answer.IsCoorect) {
                  score++;
                }
              }
            });
          });
        })
      }
    }

    if (unAnswered.length) {
      this.showModal = true;
      this.showError = true;
      return false;
    }
    studentTest.Score = (score / questions) * 100;
    this.apiServices.add(SAVE_STUDENT_TEST_URL, studentTest).subscribe(data => {
      if (data) {
        this.showModal = true;
        this.yourScore = (score / questions) * 100;
        this.showResults = true;
        this.modalHeading = 'Your test was submited!'
        if (this.yourScore < 40) {
          this.modalHeading = 'Sorry, your score need to improve🙂'
        }
        if (this.yourScore > 40) {
          this.modalHeading = 'Not bad, please practice more though🙂'
        }
        if (this.yourScore > 50) {
          this.modalHeading = 'Well done, but please practice more 🙂'
        }
        if (this.yourScore > 70) {
          this.modalHeading = 'Very good ⭐️'
        }
        if (this.yourScore >= 80) {
          this.modalHeading = 'Your got an A ⭐️⭐️⭐️'
        }
        if (this.yourScore === 100) {
          this.modalHeading = 'Master ⭐️⭐️⭐️⭐️⭐️'
        }

      }
    })
  }

  select(answer: Answer) {
    answer.StudentAnswer = !answer.StudentAnswer;
  }
  closeModal() {
    this.showModal = false;
    this.showError = false;
    this.showResults = false;
  }

  goHome() {
    this._location.back();
  }

  takeTestAgain() {
   this.test.Sections.map(s=>s.Questions.map(x=>x.Answers.map(xa=>xa.StudentAnswer = undefined)));
    this.closeModal();
  }
}
