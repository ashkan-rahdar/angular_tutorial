import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toman',
  standalone: true
})
export class TomanPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number, currency: string): string {
    if (currency == 'T'){
      let valueT = value * (10**6);
      let result = this.decimalPipe.transform(valueT);
      return result!=null ? result + " T" : "0 T";
    }
    else{
      return "no valid currency";
    }
  }

}
