import { Pipe, PipeTransform } from '@angular/core';
import { Studentsubject } from '../_models/studentsubject.model';

@Pipe({
  name: 'studentsubjects'
})
export class StudentsubjectsPipe implements PipeTransform {

  transform(items: Studentsubject[], args?: any): any {
    let data = [];
    items.forEach(item => {
      data.push(`${item.Subject.Name}`);
    });
    return data;
  }

}
