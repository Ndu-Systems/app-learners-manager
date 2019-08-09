import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { CommunicationComponent } from './communication/communication.component';
import { AssertsComponent } from './asserts/asserts.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'messaging', component: CommunicationComponent },
      { path: 'asserts', component: AssertsComponent }
    ]
  },
];
export const declarations: Array<any> = [
  DashboardComponent, SideNavComponent, DashboardHomeComponent, CommunicationComponent, AssertsComponent
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
