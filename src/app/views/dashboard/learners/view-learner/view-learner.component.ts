import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { ApiService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';
import { GET__GRADE_DETAILS_URL } from 'src/app/_services/_shared';

@Component({
  selector: 'app-view-learner',
  templateUrl: './view-learner.component.html',
  styleUrls: ['./view-learner.component.scss']
})
export class ViewLearnerComponent implements OnInit {
  student: User;
  userId: string;
  showModal: boolean;
  modalHeading: string;
  subjects: any = [];
  color: ThemePalette = 'primary';
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userId = r.id;
    });
  }

  ngOnInit() {
    this.student = this.userService.currentUserValue;
    this.userService.getUser(this.userId);
    this.userService.userObservable.subscribe(user => {
      this.student = user;
      this.loadSubjects();
    });
  }

  back() {
    this.router.navigate([`dashboard/learners`])
  }
  add() {
    this.showModal = true;
    this.modalHeading = 'Student Subjects';
  }
  closeModal() {
    this.showModal = false;
  }
  loadSubjects() {
    this.apiService.get(`${GET__GRADE_DETAILS_URL}?GradeId=${this.student.GradeId}`).subscribe(data => {
      if (data && data.Subjects) {
        this.subjects = data.Subjects;
        this.subjects.map(x => x.IsSelected = true);
      }
    });

  }
}
