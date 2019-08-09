import { Component, OnInit } from '@angular/core';
import { AssertService } from 'src/app/_services/dashboard/assert.service';
import { CategoryService } from 'src/app/_services/dashboard/category.service';

@Component({
  selector: 'app-asserts',
  templateUrl: './asserts.component.html',
  styleUrls: ['./asserts.component.scss']
})
export class AssertsComponent implements OnInit {

  constructor(
    private assertService: AssertService,
    private categoryService: CategoryService,
    ) { }
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
    this.categoryService.getCatagories().subscribe(res => {
      this.catagories = res;
    });
  }

  addAssert(model) {
    this.assertService.addAssert(model).subscribe(res => {
     alert(JSON.stringify(res));
    });
  }
  addCategory(model) {
    this.categoryService.addCategory(model).subscribe(res => {
      alert(JSON.stringify(res));
    });
  }
}
