import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonActionModel, HeaderBannerModel } from 'src/app/_models';
import { DELETE_ACTION, EDIT_ACTION, SAVE_ACTION } from 'src/app/_shared';

@Component({
  selector: 'app-actions-section',
  templateUrl: './actions-section.component.html',
  styleUrls: ['./actions-section.component.scss']
})
export class ActionsSectionComponent implements OnInit {
  headerBanner: HeaderBannerModel = {
    Header: 'Action Center',
    SubHeader: 'Perform key system actions.'
  };
  @Input() actionButtons: ButtonActionModel[];
  @Output() clickedAction: EventEmitter<string> = new EventEmitter(null);
  saveBtn: ButtonActionModel;
  editBtn: ButtonActionModel;
  deleteBtn: ButtonActionModel;
  constructor() { }

  ngOnInit() {
    this.mapButtons();
  }

  mapButtons() {
    if(this.actionButtons.length > 0) {
      this.saveBtn = this.actionButtons.find(x => x.actionType === SAVE_ACTION);
      this.editBtn = this.actionButtons.find(x => x.actionType === EDIT_ACTION);
      this.deleteBtn = this.actionButtons.find(x => x.actionType === DELETE_ACTION);
    }
  }

  onActionClicked(type: string) {
    this.clickedAction.emit(type);
  }
} 
