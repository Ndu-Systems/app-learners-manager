import { Component, OnInit, Input } from '@angular/core';
import { BreadCrumbModel } from 'src/app/_models';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() crumbs: BreadCrumbModel[];
  constructor() { }

  ngOnInit() {
  }

}
