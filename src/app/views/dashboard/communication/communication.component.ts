import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SendSMSBody } from '../models';
import { SmsService } from 'src/app/_services/dashboard/sms.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {

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
  ) {

  }

  ngOnInit() {
    this.rForm = this.fb.group({
      Subject: [null, Validators.required],
      SendTo: [null, Validators.required],
      Body: [null, Validators.required],
      FromNumber: ['+12134442683', Validators.required],
    });
  }

  send(model: SendSMSBody) {
    this.smsService.send(model).subscribe(response => {
      alert(JSON.stringify(response));
    });
  }


}
