import { Directive } from '@angular/core';

@Directive({
  selector: '[showMoreList]',
  standalone: true,
})
export class ShowMoreListDirective {
  constructor() {
    console.log('Hello from my directive.');
  }
}
