import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundup'
})
export class RoundupPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return Math.ceil(value/100)*100;
  }

}
