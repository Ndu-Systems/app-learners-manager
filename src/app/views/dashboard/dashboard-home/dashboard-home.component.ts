import { Component, OnInit } from '@angular/core';
import { AssertService } from 'src/app/_services/dashboard/assert.service';
import { Observable } from 'rxjs';
import { Assert } from 'src/app/_models';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  asserts: Observable<Assert[]>;
  constructor(private assertService:AssertService) { }

  ngOnInit() {
      this.asserts = this.assertService.asserts;
      console.log("_oo_",this.asserts);
      this.assertService.getAssertsDataStore();
      
  }

}
