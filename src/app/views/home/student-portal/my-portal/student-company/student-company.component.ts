import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-company',
  templateUrl: './student-company.component.html',
  styleUrls: ['./student-company.component.scss']
})
export class StudentCompanyComponent implements OnInit {
  @Input() company;
  @Input() RegisteredDate;
   constructor() { }

  ngOnInit() {
  }
  showUplaod(){}
}
