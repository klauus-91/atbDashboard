import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyLabel',
  standalone: true
})
export class PrettyLabelPipe implements PipeTransform {

  transform(value: string): string {
    //agenyPerZone => Agency Per Zone
    if (!value) return '';
    console.log(value
      .replace(/([A-Z])/g, ' $1')   // Add space before each capital letter
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim());
  
    return value
      .replace(/([A-Z])/g, ' $1')   // Add space before each capital letter
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim();
  }

}
