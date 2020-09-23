import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { GradesComponent } from './grades/grades/grades.component';
import { GradeComponent } from './grades/grade/grade.component';
import { SubjectsComponent } from './subject/subjects/subjects.component';
import { SubjectComponent } from './subject/subject/subject.component';
import { TopicComponent } from './subject/topic/topic.component';
import { TestsComponent } from './tests/tests/tests.component';
import { TestComponent } from './tests/test/test.component';
import { HeaderBannerComponent, BreadcrumbComponent, StatCardComponent } from './shared';
import { LearnersComponent } from './learners/learners/learners.component';
import { StudentsubjectsPipe } from 'src/app/_pipes/studentsubjects.pipe';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'grades', component: GradesComponent },
      { path: 'grade', component: GradeComponent },
      { path: 'subjects/:id', component: SubjectsComponent },
      { path: 'subject/:id', component: SubjectComponent },
      { path: 'topic/:id', component: TopicComponent },
      { path: 'tests/:id', component: TestsComponent },
      { path: 'test/:id', component: TestComponent },
      { path: 'learners', component: LearnersComponent },
    ]
  }
];
export const declarations: Array<any> = [
  DashboardComponent,
  DashboardNavComponent,
  DashboardHomeComponent, 
  GradeComponent, 
  GradesComponent,
  SubjectsComponent,
  SubjectComponent,
  TopicComponent,
  TestsComponent,
  TestComponent,
  HeaderBannerComponent,
  BreadcrumbComponent,
  StatCardComponent,
  LearnersComponent,
  StudentsubjectsPipe
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

