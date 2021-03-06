import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, DocumentsService } from 'src/app/_services';
import { GET_TEST_URL, STATUS_DELETED, ADD_QUESTION_URL, ADD_SECTION_URL, UPDATE_SECTION_URL, ADD_OR_UPDARE_ANSWERS_RANGE_URL, UPDATE_QUESTION_URL } from 'src/app/_services/_shared';
import { Tests, Question, Answer, Section } from 'src/app/_models/tests.model';
import { User } from 'src/app/_models/user.model';
import { environment } from 'src/environments/environment';
import { BreadCrumbModel, HeaderBannerModel } from 'src/app/_models';
import { StudentTest, StudentAnswer } from 'src/app/_models/student.test';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  TestId: any;
  @Input() test: Tests;
  @Input() modalHeading: string;
  @Input() showPreview: boolean;
  user: User;
  sections: Section[];
  current: Section;
  name: any;
  isUpdate: boolean;
  showModal: boolean;
  isDelete: boolean;
  addingQuestion: boolean;
  question: string;
  contentBody: string;
  score: any;
  error;
  crumbs: BreadCrumbModel[] = [];
  studentAnswers: StudentAnswer[];
  showStudentAnswers: boolean;

  headerBanner: HeaderBannerModel = {
    Header: 'Test sections',
    SubHeader: 'A collection of test sections in the system.',
    ctaLabel: '+ Add section'
  };
  constructor(
    private apiServices: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private documentsService: DocumentsService,
    private _snackBar: MatSnackBar

  ) {
    this.activatedRoute.params.subscribe(r => {
      this.TestId = r.id;

    });
  }

  ngOnInit() {

    this.user = this.accountService.currentUserValue;
  }
  goto(url) {
    this.router.navigate([`dashboard/${url}`])
  }
  options(item: Section) {
    this.sections.map(x => x.Viewing = false);
    item.Viewing = true;
  }
  delete(item: Section) {
    this.isDelete = true;
    this.name = item.Name;
    this.current = item;
    this.current.StatusId = STATUS_DELETED;
    this.modalHeading = `${item.Name}  will be deleted, continue?`
    this.sections.map(x => x.Viewing = false);
  }
  addQuestion() {
    this.addingQuestion = true;
    this.question = '';
    this.score = 0;
    this.contentBody = undefined;
    this.modalHeading = `Add a question`;
  }
  edit(item: Section) {
    this.showModal = true;
    this.isUpdate = true;
    this.name = item.Name;
    this.current = item;
    this.modalHeading = 'Update section.'
    this.sections.map(x => x.Viewing = false);
  }
  closeModal() {
    this.showModal = false;
    this.isDelete = false;
    this.addingQuestion = false;
    this.showStudentAnswers = false;
  }
  add() {
    this.showModal = true;
    this.isUpdate = false;
    this.name = undefined;
    this.modalHeading = 'Add Test Section';
  }
  addAnswer(question: Question) {
    question.Answers.push({
      AnswerId: '',
      QuestionId: question.QuestionId,
      Answer: '',
      IsCoorect: false,
      ImageUrl: '',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: '1'
    }
    );

  }

  deleteAnswer(answer: Answer) {
    answer.StatusId = STATUS_DELETED;
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
      formData.append('name', `otc.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.documentsService.uploadFile(formData).subscribe(url => {
        this.contentBody = `${environment.API_URL}/api/upload/${url}`;
      });

    });

  }

  saveQuestion() {
    const data = {
      TestId: this.test.TestId,
      SectionId: '',
      Question: this.question || '',
      ImageUrl: this.contentBody || '',
      Score: this.score || 1,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }

    this.apiServices.actionQuery(ADD_QUESTION_URL, data).subscribe(res => {
      this.showModal = false;
      this.addingQuestion = false;
      this.question = '';
      this.contentBody = '';
      if (!this.test.Questions) {
        this.test.Questions = [];
      }
      res.Answers = [];
      this.test.Questions.push(res);
      this.openSnackBar('Success, Question  created.', 'Got it!');

    })
  }


  saveSection() {
    const data: Section = {
      TestId: this.test.TestId,
      Name: this.name || '',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }

    if (this.isUpdate || this.isDelete) {
      this.current.Name = this.name;
      if (this.isDelete) {
        this.current.StatusId = STATUS_DELETED;
      }
      this.apiServices.actionQuery(UPDATE_SECTION_URL, this.current).subscribe(res => {
        this.showModal = false;
        this.isDelete = false;
        this.addingQuestion = false;
        this.question = '';
        this.contentBody = '';
        this.ngOnInit();
      })
    } else {
      this.apiServices.actionQuery(ADD_SECTION_URL, data).subscribe(res => {
        this.showModal = false;
        this.addingQuestion = false;
        this.question = '';
        this.contentBody = '';
        this.ngOnInit();
      })
    }
  }

  saveAnswers(answers: Answer[]) {


    this.apiServices.actionQuery(ADD_OR_UPDARE_ANSWERS_RANGE_URL, answers).subscribe(res => {
      this.showModal = false;
      this.addingQuestion = false;
      this.question = '';
      this.contentBody = '';
      this.openSnackBar('Success, Answers saved', 'Got it!');

    })
  }

  viewTestAnswers(studentTest: StudentTest) {
    this.studentAnswers =
      studentTest.Answers.map(studentAnswer => {
        if (!studentAnswer.Question.Answers.find(a => a.IsCoorect)) {
          alert("Error, some please check that " + studentAnswer.Question.Question + " have the configured correct answer!");
          return null;
        }
        studentAnswer.Question.CorrectAnswer = studentAnswer.Question.Answers.find(a => a.IsCoorect).Answer;
        studentAnswer.Question.StudentAnswer = studentAnswer.Question.Answers.find(a => a.AnswerId === studentAnswer.AnswerId).Answer;
        studentAnswer.Question.StudentAnswer == studentAnswer.Question.CorrectAnswer ?
          studentAnswer.Class = ['correct', 'student-answer'] : studentAnswer.Class = ['wrong', 'student-answer'];
        return studentAnswer;
      });
    this.showStudentAnswers = true;
    this.modalHeading = `Answers for ${studentTest.User.Name}`;


  }
  getCorrectAnswer(answer: any) {
    return answer.Question.Answers.find(a => a.IsCoorect).Answer;
  }
  openSnackBar(message, heading) {
    let snackBarRef = this._snackBar.open(message, heading, {
      duration: 5000
    });

  }
  preview(val) { }
  copyText() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `${environment.BASE_URL}/#/online-quiz/${this.test.TestId}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.openSnackBar('Link copied to clipboard!', 'Ready to paste & share');

  }
  deleteQuestion(question: Question, index) {
    question.StatusId = STATUS_DELETED;
    this.apiServices.actionQuery(UPDATE_QUESTION_URL, question).subscribe(res => {
      this.question = '';
      this.contentBody = '';
      if (!this.test.Questions) {
        this.test.Questions = [];
      }
      res.Answers = [];
      this.test.Questions.splice(index, 1);
      this.openSnackBar('Question  removed.', 'Success!');

    })
  }
}
