import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HeaderBannerModel } from 'src/app/_models';

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.scss']
})
export class HeaderBannerComponent implements OnInit {
  @Output() showModalEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() headerBanner:HeaderBannerModel; 
  constructor() { }

  ngOnInit() {
  }

  showModal(){
    this.showModalEventEmitter.emit(true);
  }

}
