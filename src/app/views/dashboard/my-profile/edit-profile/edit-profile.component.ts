import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonActionModel } from 'src/app/_models';
import { User } from 'src/app/_models/user.model';
import { EDIT_ACTION, SAVE_ACTION } from 'src/app/_shared';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() user: User;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter(null);
  @Output() onClicked: EventEmitter<string> = new EventEmitter(null);
  hidePassword = true;

  modalHeading = 'Update user profile';
  actionButtons: ButtonActionModel[] = [
    {
      actionType: SAVE_ACTION,
      label: 'profile'
    }
  ]
  constructor() { }

  ngOnInit() {
  }
  onClickedAction($event) {
     this.onClicked.emit($event);
  }
  close() {
    this.closeModal.emit(true);
  }
}
