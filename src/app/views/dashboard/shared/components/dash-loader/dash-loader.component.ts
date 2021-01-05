import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-loader',
  templateUrl: './dash-loader.component.html',
  styleUrls: ['./dash-loader.component.scss']
})
export class DashLoaderComponent implements OnInit {
  @Input() showLoader: boolean;
  constructor() { }

  ngOnInit() {
  }

}
