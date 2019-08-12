import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private parentService: ParentService
  ) { }

  ngOnInit() {
  this.parentService.getParents();
  }

}
