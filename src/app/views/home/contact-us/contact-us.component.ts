import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ContactService } from 'src/app/_services';
import { ContactModel } from 'src/app/_models';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  rForm: FormGroup;
  error: string;
  model: ContactModel;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.contactService.getContactDetails();
    this.model = this.contactService.currentContactValue;
    this.rForm = this.fb.group({
      Email: new FormControl(
        null,
        Validators.compose([
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
      FullName: [null],
      ContactNumber: [null, Validators.required],
      Message: [null, Validators.required]
    });
  }

  onSubmit(model) {
    console.log('contact form', JSON.stringify(model));
  }

  clearForm() {
    this.rForm.reset();
  }

}
