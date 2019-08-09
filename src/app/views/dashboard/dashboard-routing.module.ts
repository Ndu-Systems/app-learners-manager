import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { CommunicationComponent } from './communication/communication.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'messaging', component: CommunicationComponent },
    ]
  },
];
export const declarations: Array<any> = [
  DashboardComponent, SideNavComponent, DashboardHomeComponent, CommunicationComponent
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
