import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SmsService } from 'src/app/_services/dashboard/sms.service';
import { MessageService } from 'primeng/api';
import { AssertService } from 'src/app/_services/dashboard/assert.service';
import { CategoryService } from 'src/app/_services/dashboard/category.service';
import { Category } from 'src/app/_models';

@Component({
  selector: 'app-add-assert',
  templateUrl: './add-assert.component.html',
  styleUrls: ['./add-assert.component.scss']
})
export class AddAssertComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  catagories: Category[];
  searchResults: string[];
  text: string;
  Category: string;
  Description: any;
  constructor(
    private messageService: MessageService,
    private assertService: AssertService,
    private categoryService: CategoryService
  ) {

  }

  ngOnInit() {
    this.getCatagories();
  }

  getCatagories() {
    this.categoryService.getCatagories().subscribe(res => {
      this.catagories = res;
    });
  }
  addAssert() {
    const model = {
      CategoryId: this.getSelectedCatergoryId(),
      Description: this.Description
    };
    if(!model.CategoryId){
      return false;
    }
    this.assertService.addAssert(model).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: JSON.stringify(response), detail: 'Order submitted' });
    });
  }
  search(event) {
    const catagories = this.catagories.filter(x => x.description != null && x.description !== '');

    this.searchResults = catagories.filter(x => x.description.toLocaleLowerCase()
      .includes(event.query.toLocaleLowerCase())).map(x => x.description);
  }

  getSelectedCatergoryId() {
    const catagories = this.catagories.filter(x => x.description != null && x.description !== '');

    const cat = catagories.filter(x => x.description.toLocaleLowerCase() === this.Category.toLocaleLowerCase());
    if (cat.length) {
      return cat[0].categoryId;
    } else {
      this.categoryService.addCategory({ Description: this.Category }).subscribe(res => {
        this.catagories.push(res);
        return res.categoryId;
      });
    }
    return '';
  }
}
