import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ShowMoreListDirective } from '@show-more-list/show-more-list';

@Component({
  standalone: true,
  imports: [CommonModule, ShowMoreListDirective],
  selector: 'show-more-list-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'show-more-list-app';

  listOne = [
    'item 1',
    'item 2',
    'item 3',
  ]

  listTwo = [
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 5',
  ]

  list = this.listTwo;

  toggleList(): void {
    this.list = this.list === this.listOne ? this.listTwo : this.listOne;
  }
}
