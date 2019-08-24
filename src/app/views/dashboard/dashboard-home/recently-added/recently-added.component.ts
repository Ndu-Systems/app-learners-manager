import { Component, OnInit, Input } from '@angular/core';
import { ParentService } from 'src/app/_services/dashboard/parent.service';
import { LearnerService } from 'src/app/_services';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss']
})
export class RecentlyAddedComponent implements OnInit {
  @Input() listType: string;
  data: any[];
  constructor(private parentService: ParentService, private learnerService: LearnerService) { }

  ngOnInit() {
    if (this.listType === 'parents') {
      this.parentService.parents.subscribe(data => {
        this.data = data;
      });
    } else if (this.listType === 'learners') {
      this.learnerService.learners.subscribe(data => {
        this.data = data;
      });
    }
  }

}
