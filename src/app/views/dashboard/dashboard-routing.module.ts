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
import { HeaderBannerComponent, BreadcrumbComponent, StatCardComponent, ActionsSectionComponent} from './shared';
import { LearnersComponent } from './learners/learners/learners.component';
import { StudentsubjectsPipe } from 'src/app/_pipes/studentsubjects.pipe';
import { AddLearnerComponent } from './learners/add-learner/add-learner.component';
import { DashLoaderComponent } from './shared/components/dash-loader/dash-loader.component';
import { ViewLearnerComponent } from './learners/view-learner/view-learner.component';
import { ListLessonsComponent } from './subject/list-lessons/list-lessons.component';
import { TeachersComponent } from './teachers/teachers.component';
import { AddTeacherComponent } from './teachers/add-teacher/add-teacher.component';
import { UserProfileComponent } from 'src/app/_shared/components/user-profile/user-profile.component';
import { ViewTeachersComponent } from './teachers/view-teachers/view-teachers.component';
import { StatusToStringPipe } from 'src/app/_pipes/status.pipe';
import { ListAssignmentsComponent } from './subject/list-assignments/list-assignments.component';
import { AddAssignmentComponent } from './subject/add-assignment/add-assignment.component';
import { ImagesComponent } from 'src/app/_shared/components/images/images.component';
import { TeacherGradesComponent } from './grades/teacher-grades/teacher-grades.component';
import { CompanyViewComponent } from './company-view/company-view.component';
import { EditProfileComponent, MyProfileComponent, UserDpComponent } from './my-profile';
import { AuthGuard } from 'src/app/_guards';
import { LessonPreviewComponent } from './subject/list-lessons';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'grades', component: GradesComponent },
      { path: 'grade', component: GradeComponent },
      { path: 'subjects/:id', component: SubjectsComponent },
      { path: 'subject/:id', component: SubjectComponent },
      { path: 'topic/:id', component: TopicComponent },
      { path: 'tests/:id', component: TestsComponent },
      { path: 'test/:id', component: TestComponent },
      { path: 'view-learner/:id', component: ViewLearnerComponent },
      { path: 'view-teacher/:id', component: ViewTeachersComponent },
      { path: 'learners', component: LearnersComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'company', component: CompanyViewComponent },
      { path: 'profile', component: MyProfileComponent },
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
  StudentsubjectsPipe,
  AddLearnerComponent,
  DashLoaderComponent,
  ViewLearnerComponent,
  ListLessonsComponent,
  TeachersComponent,
  AddTeacherComponent,
  UserProfileComponent,
  ViewTeachersComponent,
  StatusToStringPipe,
  ListAssignmentsComponent,
  AddAssignmentComponent,
  ImagesComponent,
  TeacherGradesComponent,
  CompanyViewComponent,
  UserDpComponent,
  MyProfileComponent,
  ActionsSectionComponent,
  LessonPreviewComponent,
  EditProfileComponent
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

