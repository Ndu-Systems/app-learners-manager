import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/_services/dashboard/parent.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {
  parents;
  constructor(
    private parentService: ParentService
  ) {
  }
  ngOnInit() {
    this.parentService.parents.subscribe(data => {
      this.parents = data;
    });
  }

}
