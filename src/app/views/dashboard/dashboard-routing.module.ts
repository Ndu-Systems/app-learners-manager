import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { CommunicationComponent } from './communication/communication.component';
import { AssertsComponent } from './asserts/asserts.component';
import { AddAssertComponent } from './asserts/add-assert/add-assert.component';
import { ParentsComponent } from './parents/parents.component';
import { AddParentComponent } from './parents/add-parent/add-parent.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'messaging', component: CommunicationComponent },
      { path: 'asserts', component: AssertsComponent },
      { path: 'add-assert', component: AddAssertComponent },
      { path: 'parents', component: ParentsComponent },
      { path: 'add-parent', component: AddParentComponent },
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
  AddParentComponent
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
