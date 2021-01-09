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
import { StudentSubjectsListComponent } from './student-portal/my-portal/student-subjects-list/student-subjects-list.component';
import { StudentAssignmentComponent } from './student-portal/my-portal/student-assignment/student-assignment.component';
import { FeaturesComponent } from './features/features.component';
import { StudentCompanyComponent } from './student-portal/my-portal/student-company/student-company.component';
import { AuthGuard } from 'src/app/_guards';
import { SplashScreenComponent } from './splash-screen';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'before-start', component: SplashScreenComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'pricing', component: PricingTableComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'my-portal', component: MyPortalComponent, canActivate: [AuthGuard] },
      { path: 'view-subject', component: ViewSubjectComponent, canActivate: [AuthGuard] },
      { path: 'view-tests', component: ViewTestsComponent, canActivate: [AuthGuard] },
      { path: 'take-test', component: TakeTestComponent , canActivate: [AuthGuard]},
      { path: 'read-topic', component: ReadTopicComponent , canActivate: [AuthGuard]},
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'read/:id', component: ReadComponent },
      { path: 'online-quiz/:id', component: OnlineQuizComponent },
      { path: 'question/:id', component: ViewQuestionComponent, canActivate: [AuthGuard] },
      { path: 'questions-hub', component: ListQuestionsComponent , canActivate: [AuthGuard]},
      { path: 'student-assignment', component: StudentAssignmentComponent , canActivate: [AuthGuard]},
      { path: 'features', component: FeaturesComponent }
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
  HomeCommentsComponent,
  StudentSubjectsListComponent,
  StudentAssignmentComponent,
  FeaturesComponent,
  StudentCompanyComponent,
  SplashScreenComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
