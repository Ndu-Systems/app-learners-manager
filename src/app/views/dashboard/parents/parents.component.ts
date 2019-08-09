import { Component, OnInit } from '@angular/core';
import { AssertService } from 'src/app/_services/dashboard/assert.service';
import { ParentService } from 'src/app/_services/dashboard/parent.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {


  constructor(
    private parentService: ParentService
    ) { }
  parents: any[];
  ngOnInit() {
    this.getParents();
  }
  getParents() {
    this.parentService.getParents().subscribe(res => {
      this.parents = res;
    });
  }
}
