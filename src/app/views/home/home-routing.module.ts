import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index';
import { HomeComponent } from './home.component';
import { SignInComponent } from './sign-in';
import { AboutUsComponent } from './about-us';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { IntroSectionComponent } from './index/intro-section/intro-section.component';
import { TestimonialsComponent } from './index/Testimonials/Testimonials.component';
import {SubjectsComponent} from './index/Subjects/Subjects.component';
import { StatisticsComponent } from './index/statistics/statistics.component';
import { NewsComponent } from './index/news/news.component';






const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: IndexComponent },
      { path: 'login', component: SignInComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
    ]
  },
];
export const declarations: Array<any> = [
  IndexComponent,
  HomeComponent,
  SignInComponent,
  AboutUsComponent,
  ContactUsComponent,
  IntroSectionComponent,
  TestimonialsComponent,
  SubjectsComponent,
  StatisticsComponent,
  NewsComponent,
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
