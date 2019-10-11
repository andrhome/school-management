import { Pipe, PipeTransform } from '@angular/core';
import { AgeCategoryType } from '@app/types/common.types';

@Pipe({
  name: 'getCategoriesStr'
})
export class GetCategoriesStrPipe implements PipeTransform {

  transform(value: Array<AgeCategoryType>): any {
    let str = '';

    if (!value.length) {
      return '';
    }

    value.forEach(item => {
      str += item.name + ' - от ' + item.fromAge + ' до ' + item.toAge + ' лет, ';
    });

    return str.slice(0, str.length - 2);
  }

}
