import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderline'
})
export class RemoveUnderlinePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/_/g, '-');
    //return value.split('_').join(' ');
  }

}
