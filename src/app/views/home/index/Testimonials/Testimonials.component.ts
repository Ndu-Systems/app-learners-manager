import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Testimonials',
  templateUrl: './Testimonials.component.html',
  styleUrls: ['./Testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  showOne = true;
  showTwo: boolean;
  showThree: boolean;
  constructor() { }

  ngOnInit() {
  }
  next(code: number) {
    if (code === 1) {
      if (this.showOne) {
        this.showOne = false;
        this.showTwo = true;
        this.showThree = false;
        return;
      }

      if (this.showTwo) {
        this.showOne = false;
        this.showTwo = false;
        this.showThree = true;
        return;

      }

      if (this.showThree) {
        this.showOne = true;
        this.showTwo = false;
        this.showThree = false;
        return;

      }
    } else {
      if (this.showOne) {
        this.showOne = false;
        this.showTwo = false;
        this.showThree = true;
        return;

      }

      if (this.showTwo) {
        this.showOne = true;
        this.showTwo = false;
        this.showThree = false;
        return;

      }

      if (this.showThree) {
        this.showOne = false;
        this.showTwo = true;
        this.showThree = false;
        return;

      }
    }
  }
}
