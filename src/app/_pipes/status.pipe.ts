import { Pipe, PipeTransform } from '@angular/core';
import { Studentsubject } from '../_models/studentsubject.model';

@Pipe({
  name: 'statusToString'
})
export class StatusToStringPipe implements PipeTransform {

  transform(statusId: number): string {
    let status = [
      {
        Id: 1,
        Name: 'Active'
      },
      {
        Id: 99,
        Name: 'Archived'
      }
    ];
    if (status.find(x => x.Id === Number(statusId))) {
      return status.find(x => x.Id === Number(statusId)).Name;
    }
    return '';
  }

}
