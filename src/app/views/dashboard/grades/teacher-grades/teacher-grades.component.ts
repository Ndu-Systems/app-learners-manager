import { Component, Input, OnInit } from '@angular/core';
import { Grade } from 'src/app/_models/grade.model';

@Component({
  selector: 'app-teacher-grades',
  templateUrl: './teacher-grades.component.html',
  styleUrls: ['./teacher-grades.component.scss']
})
export class TeacherGradesComponent implements OnInit {
  @Input() grades: Grade[];
  grade: Grade;
  gradeId: string;
  constructor() { }

  ngOnInit() {
    if (this.grades && this.grades.length) {
      this.grade = this.grades[0];
      this.gradeId = this.grade.GradeId;
    }
  }
  gradeChanged(grade: Grade) {
    this.grade = grade;
  }

  addGrade() {

  }
}
