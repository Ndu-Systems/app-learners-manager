import { Component, OnInit } from '@angular/core';
import { AssertService } from 'src/app/_services/dashboard/assert.service';

@Component({
  selector: 'app-asserts',
  templateUrl: './asserts.component.html',
  styleUrls: ['./asserts.component.scss']
})
export class AssertsComponent implements OnInit {

  constructor(private assertService: AssertService) { }
  assets: any[];
  catagories: any[];
  ngOnInit() {
    this.getAsserts();
    this.getCatagories();
  }
  getAsserts() {
    this.assertService.getAsserts().subscribe(res => {
      this.assets = res;
    });
  }

  getCatagories() {
    this.assertService.getCatagories().subscribe(res => {
      this.assets = res;
    });
  }

  addAssert(model) {
    this.assertService.addAssert(model).subscribe(res => {
      this.assets = res;
    });
  }
  addCatagory(model) {
    this.assertService.addCatagory(model).subscribe(res => {
      this.assets = res;
    });
  }
}
