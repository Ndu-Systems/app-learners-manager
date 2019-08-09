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

  rForm: FormGroup;
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
    private fb: FormBuilder,
    private routeTo: Router,
    private route: ActivatedRoute,
    private smsService: SmsService,
    private messageService: MessageService,
    private assertService: AssertService,
    private categoryService: CategoryService
  ) {

  }

  ngOnInit() {
    this.rForm = this.fb.group({
      CategoryId: [null, Validators.required],
      Category: [this.text, Validators.required],
      Description: [null, Validators.required]
    });
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
    this.assertService.addAssert(model).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: JSON.stringify(response), detail: 'Order submitted' });
    });
  }
  search(event) {

    this.searchResults = this.catagories.filter(x => x.description.toLocaleLowerCase()
      .includes(event.query.toLocaleLowerCase())).map(x => x.description);
  }

  getSelectedCatergoryId() {
    const cat = this.catagories.filter(x => x.description.toLocaleLowerCase() === this.Category.toLocaleLowerCase());
    if (cat.length) {
      return cat[0].categoryId;
    }
  }
}
