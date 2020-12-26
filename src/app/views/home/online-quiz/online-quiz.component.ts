import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentTest } from 'src/app/_models/student.test';
import { Answer } from 'src/app/_models/tests.model';
import { AccountService, ApiService } from 'src/app/_services';
import { GET_QUIZZ_URL, SAVE_STUDENT_TEST_URL } from 'src/app/_services/_shared';

@Component({
  selector: 'app-online-quiz',
  templateUrl: './online-quiz.component.html',
  styleUrls: ['./online-quiz.component.scss']
})
export class OnlineQuizComponent implements OnInit {
  TestId: any;
  test: any;
  user: any;
  showModal: boolean;
  showError: boolean;
  yourScore: number;
  showResults: boolean;
  modalHeading: string;
  _location: any;
  showLogin: boolean;

  constructor(
    private apiServices: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private accountService: AccountService,

  ) {
    this.activatedRoute.params.subscribe(r => {
      this.TestId = r.id;
    });
  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;

    this.apiServices.get(`${GET_QUIZZ_URL}?TestId=${this.TestId}`).subscribe(data => {
      if (data) {
        this.test = data;
      }
    });
  }

  backClicked() {
    if (!this.user) {
      this.showLogin = true;
      return false;
    }
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
      if (this.test.Questions) {
        this.test.Questions.forEach(question => {
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
      }
    }

    if (unAnswered.length) {
      this.showModal = true;
      this.showError = true;
      return false;
    }
    studentTest.Score = (score / questions) * 100 || 0;

    this.apiServices.actionQuery(SAVE_STUDENT_TEST_URL, studentTest).subscribe(data => {
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
    this.showResults = false;
    this.takeTestAgain();
  }

  takeTestAgain() {
    this.test.Questions.map(x => x.Answers.map(xa => xa.StudentAnswer = undefined));
    this.closeModal();
  }
  userDoneLoginIn(user) {
    this.user = user;
    this.showLogin = false;
    this.backClicked();
  }
  back() {
    this.router.navigate(['']);
  }
}
