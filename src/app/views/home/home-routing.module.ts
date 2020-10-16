import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeNavComponent } from './home-nav';
import { SignInComponent, SignUpComponent, ForgotPasswordComponent, ResetPasswordComponent } from './account';
import { PricingTableComponent } from './pricing-table';
import { ContactUsComponent } from './contact-us';
import { MyPortalComponent } from './student-portal/my-portal/my-portal.component';
import { ViewSubjectComponent } from './student-portal/view-subject/view-subject.component';
import { ViewTestsComponent } from './student-portal/view-tests/view-tests.component';
import { ReadTopicComponent } from './student-portal/read-topic/read-topic.component';
import { TakeTestComponent } from './student-portal/take-test/take-test.component';
import { LoaderComponent } from './_shared';
import { ReadComponent } from './read/read.component';
import { OnlineQuizComponent } from './online-quiz/online-quiz.component';
import { LoginModalComponent } from './account/login-modal/login-modal.component';
import { PublicQuestionsComponent } from './student-portal/public-questions/public-questions.component';
import { ListQuestionsComponent } from './student-portal/public-questions/list-questions/list-questions.component';
import { ViewQuestionComponent } from './student-portal/public-questions/view-question/view-question.component';
import { HomeCommentsComponent } from './student-portal/my-portal/home-comments/home-comments.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'pricing', component: PricingTableComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'my-portal', component: MyPortalComponent },
      { path: 'view-subject', component: ViewSubjectComponent },
      { path: 'view-tests', component: ViewTestsComponent },
      { path: 'take-test', component: TakeTestComponent },
      { path: 'read-topic', component: ReadTopicComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'read/:id', component: ReadComponent },
      { path: 'online-quiz/:id', component: OnlineQuizComponent },
      { path: 'question/:id', component: ViewQuestionComponent },
      { path: 'questions-hub', component: ListQuestionsComponent },
    ]

  }
];

export const declarations = [
  HomeComponent,
  IndexComponent,
  HomeNavComponent,
  SignInComponent,
  SignUpComponent,
  PricingTableComponent,
  ContactUsComponent,
  MyPortalComponent,
  ViewSubjectComponent,
  ViewTestsComponent,
  ReadTopicComponent,
  TakeTestComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  LoaderComponent,
  ReadComponent,
  OnlineQuizComponent,
  LoginModalComponent,
  PublicQuestionsComponent,
  ListQuestionsComponent,
  ViewQuestionComponent,
  HomeCommentsComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
