import { Component, OnInit } from '@angular/core';
import { GENDER, GRADE, RACE, SECTION } from 'src/app/_models/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Learner } from 'src/app/_models';
import { LearnerService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-learner',
  templateUrl: './add-learner.component.html',
  styleUrls: ['./add-learner.component.scss']
})
export class AddLearnerComponent implements OnInit {

  genders = GENDER;
  grades = GRADE;
  races = RACE;
  sections = SECTION;
  loading = false;
  learner: Learner;
  rForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private learnerService: LearnerService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      IDNumber: [null, Validators.required],
      Gender: [null, Validators.required],
      Race: [null, Validators.required],
      DateOfBirth: [null, Validators.required],
      SchoolName: [null, Validators.required],
      Grade: [null, Validators.required],
      Section: [null, Validators.required]
    });
  }

  get f() {
    return this.rForm.controls;
  }

  addLearner() {
    this.learner = new Learner();
    this.learner.firstName = this.f.FirstName.value;
    this.learner.lastName = this.f.LastName.value;
    this.learner.idNumber = this.f.IDNumber.value;
    this.learner.gender = this.f.Gender.value;
    this.learner.dateOfBirth = this.f.DateOfBirth.value;
    this.learner.schoolName = this.f.SchoolName.value;
    this.learner.grade = this.f.Grade.value;
    this.learner.section = this.f.Section.value;
    this.learner.race = this.f.Race.value;
    this.learnerService.create(this.learner);
    this.routeTo.navigate([`dashboard/learners`]);
  }

  toLearners() {
    this.routeTo.navigate([`dashboard/learners`]);
  }

}
