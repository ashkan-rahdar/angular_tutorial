import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {}

  transform(discount: number, price: number): string {
    let fvalue = (100-discount)*price*(10**6)/100;
    let result = this.decimalPipe.transform(fvalue);
    return result ? result + " T" : "0 T";
  }

}
