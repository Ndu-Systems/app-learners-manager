import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/_services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private parentService: ParentService, private messageService: MessageService
  ) { }

  ngOnInit() {
    this.parentService.getParents();
  }
  TestMessage() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });

  }
}
