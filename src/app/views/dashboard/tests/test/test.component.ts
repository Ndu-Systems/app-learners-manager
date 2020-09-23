import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, DocumentsService } from 'src/app/_services';
import { GET_TEST_URL, STATUS_DELETED, ADD_QUESTION_URL, ADD_SECTION_URL, UPDATE_SECTION_URL, ADD_OR_UPDARE_ANSWERS_RANGE_URL } from 'src/app/_services/_shared';
import { Tests, Question, Answer, Section } from 'src/app/_models/tests.model';
import { User } from 'src/app/_models/user.model';
import { environment } from 'src/environments/environment';
import { BreadCrumbModel, HeaderBannerModel } from 'src/app/_models';
import { StudentTest, StudentAnswer } from 'src/app/_models/student.test';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  TestId: any;
  test: Tests;
  user: User;
  sections: Section[];
  modalHeading: string;
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
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.TestId = r.id;

    });
  }

  ngOnInit() {
    this.apiServices.get(`${GET_TEST_URL}?TestId=${this.TestId}`).subscribe(data => {
      if (data) {
        this.test = data;
        this.sections = this.test.Sections;
        this.crumbs = [
          {
            Label: 'dashboard',
            Link: '/dashboard'
          },
          {
            Label: 'All Grades',
            Link: '/dashboard/grades'
          },
          {
            Label: `${this.test.Subject.Grade.Name}`,
            Link: `/dashboard/subjects/${this.test.Subject.Grade.GradeId}`
          },
          {
            Label: `${this.test.Subject.Name}`,
            Link: `/dashboard/subject/${this.test.Subject.SubjectId}`
          },
          {
            Label: `Tests for ${this.test.Subject.Name}`,
            Link: `/dashboard/tests/${this.test.Subject.SubjectId}`
          },
          {
            Label: `${this.test.Name} `
          },
        ];
      }
    });
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
  addQuestion(item: Section) {
    this.addingQuestion = true;
    this.question = '';
    this.score = 0;
    this.contentBody = undefined;
    this.current = item;
    this.modalHeading = `Add a question for ${item.Name}`;
    this.sections.map(x => x.Viewing = false);
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
    console.log(question);
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
    console.log(files);
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
      SectionId: this.current.SectionId,
      Question: this.question || '',
      ImageUrl: this.contentBody || '',
      Score: this.score || 1,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }

    this.apiServices.add(ADD_QUESTION_URL, data).subscribe(res => {
      this.showModal = false;
      this.addingQuestion = false;
      this.question = '';
      this.contentBody = '';
      this.ngOnInit();
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
      this.apiServices.add(UPDATE_SECTION_URL, this.current).subscribe(res => {
        this.showModal = false;
        this.isDelete = false;
        this.addingQuestion = false;
        this.question = '';
        this.contentBody = '';
        this.ngOnInit();
      })
    } else {
      this.apiServices.add(ADD_SECTION_URL, data).subscribe(res => {
        this.showModal = false;
        this.addingQuestion = false;
        this.question = '';
        this.contentBody = '';
        this.ngOnInit();
      })
    }
  }

  saveAnswers(answers: Answer[]) {


    this.apiServices.add(ADD_OR_UPDARE_ANSWERS_RANGE_URL, answers).subscribe(res => {
      this.showModal = false;
      this.addingQuestion = false;
      this.question = '';
      this.contentBody = '';
      this.ngOnInit();
    })
  }

  viewTestAnswers(studentTest: StudentTest) {
    console.log(studentTest.Answers);
    this.studentAnswers =
      studentTest.Answers.map(studentAnswer => {
        studentAnswer.Question.CorrectAnswer = studentAnswer.Question.Answers.find(a => a.IsCoorect).Answer;
        studentAnswer.Question.StudentAnswer = studentAnswer.Question.Answers.find(a => a.AnswerId === studentAnswer.AnswerId).Answer;
        studentAnswer.Question.StudentAnswer == studentAnswer.Question.CorrectAnswer ? 
        studentAnswer.Class = ['correct', 'student-answer'] :studentAnswer.Class = ['wrong', 'student-answer'] ;
        return studentAnswer;
      });
    this.showStudentAnswers = true;
    this.modalHeading = `Answers for ${studentTest.User.Name}`;


  }
  getCorrectAnswer(answer: any) {
    let correctAnswer = '';
    console.log(answer);
    return answer.Question.Answers.find(a => a.IsCoorect).Answer;

    // studentTest.Answers.forEach(answer => {
    //   console.log(answer);
    //   correctAnswer = answer.Question.Answers.find(a => a.IsCoorect).Answer;
    // });
    return correctAnswer;
  }

}
