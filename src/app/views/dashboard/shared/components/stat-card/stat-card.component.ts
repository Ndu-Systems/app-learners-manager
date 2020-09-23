import { Component, OnInit, Input } from '@angular/core';
import { StatisticModel } from 'src/app/_models';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit {
  @Input() statistics: StatisticModel[];
  constructor() { }

  ngOnInit() {
  }

}
