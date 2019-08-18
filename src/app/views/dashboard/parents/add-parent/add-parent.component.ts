import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SmsService } from 'src/app/_services/dashboard/sms.service';
import { MessageService } from 'primeng/api';
import { SendSMSBody } from 'src/app/_models';
import { ParentService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.scss']
})
export class AddParentComponent implements OnInit {

  rForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private fb: FormBuilder,
    private parentService: ParentService,
    private messageService: MessageService,
    private routeTo: Router
  ) {

  }

  ngOnInit() {
    this.rForm = this.fb.group({
      FullName: [null, Validators.required],
      Gender: [null, Validators.required],
      IDNumber: [null, Validators.required],
      Cellphone: [null, Validators.required],
      Email: [null, Validators.required],
      Address: [null, Validators.required],
    });

  }

  save(model) {
    this.parentService.addParent(model);
  }

  toParents() {
    this.routeTo.navigate([`dashboard/parents`]);
  }

}
