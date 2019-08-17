import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/_services/dashboard/parent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {
  parents;
  constructor(
    private parentService: ParentService,
    private routeTo: Router,
  ) {
  }
  ngOnInit() {
    this.parentService.parents.subscribe(data => {
      this.parents = data;
    });
  }

  viewParentDetails(id: string) {
    this.routeTo.navigate([`dashboard/parents/${id}`]);
  }

}
