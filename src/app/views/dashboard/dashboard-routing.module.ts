import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './side-nav';
import { DashboardHomeComponent } from './dashboard-home';
import { CommunicationComponent } from './communication';
import { AssertsComponent, AddAssertComponent } from './asserts';
import { ParentsComponent, AddParentComponent, ParentDetailsComponent , ParentLearnerComponent} from './parents';
import { LearnersComponent, AddLearnerComponent, LearnerDetailsComponent, LearnerParentsComponent } from './learners';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'messaging', component: CommunicationComponent },
      { path: 'asserts', component: AssertsComponent },
      { path: 'add-assert', component: AddAssertComponent },
      { path: 'parents', component: ParentsComponent },
      { path: 'parents/:id', component: ParentDetailsComponent },
      { path: 'add-parent', component: AddParentComponent },
      { path: 'learners', component: LearnersComponent },
      { path: 'learners/:id', component: LearnerDetailsComponent },
      { path: 'add-learner', component: AddLearnerComponent }
    ]
  },
];
export const declarations: Array<any> = [
  DashboardComponent,
  SideNavComponent,
  DashboardHomeComponent,
  CommunicationComponent,
  AssertsComponent,
  AddAssertComponent,
  ParentsComponent,
  AddParentComponent,
  ParentDetailsComponent,
  ParentLearnerComponent,
  LearnersComponent,
  LearnerDetailsComponent,
  LearnerParentsComponent,
  AddLearnerComponent,
  LearnerDetailsComponent

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
