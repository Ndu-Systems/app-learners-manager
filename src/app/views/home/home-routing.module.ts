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
      { path: 'forgot-password',component: ForgotPasswordComponent},
      { path: 'reset-password',component: ResetPasswordComponent},
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
  LoaderComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
