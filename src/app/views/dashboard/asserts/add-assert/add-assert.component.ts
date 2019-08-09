import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SmsService } from 'src/app/_services/dashboard/sms.service';
import { MessageService } from 'primeng/api';
import { AssertService } from 'src/app/_services/dashboard/assert.service';
import { CategoryService } from 'src/app/_services/dashboard/category.service';

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
      Category: [null, Validators.required],
      Description: [null, Validators.required]
    });
  }

  saveAssert(model) {
    this.smsService.send(model).subscribe(response => {
      // alert(JSON.stringify(response));
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
    });
  }

}
