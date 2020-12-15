import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numword',
  pure: true
})
export class NumwordPipe implements PipeTransform {

  transform(value: number, firstCase: string, secondCase: string, thordCase: string): string {
    let dd = value % 100;
    if ((dd >= 11) && (dd <= 19))
      return thordCase;
    let d = value % 10;
    if (d == 1)
      return firstCase;
    if ((d >= 2) && (d <= 4))
      return secondCase;
    return thordCase;
  }

}