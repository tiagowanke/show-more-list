import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SmartListDirective } from './smart-list.directive';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
  standalone: true,
  imports: [CommonModule, SmartListDirective],
  selector: 'dummy',
  template: `
    <ul *smartList="minItems;showMoreText:'Mostrar Mais';showLessText:'Mostrar Menos'">
      <li *ngFor="let item of list">{{item}}</li>
    </ul>
    <br><br>
    <button (click)="toggleList()">Toggle list</button>
  `
})
export class DummyComponent {

  @Input()
  listOne = [
    'item 1',
    'item 2',
    'item 3',
  ]

  @Input()
  listTwo = [
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 5',
  ]

  @Input()
  minItems!: number;

  list = this.listTwo;

  toggleList(): void {
    this.list = this.list === this.listOne ? this.listTwo : this.listOne;
  }
}

const meta: Meta<DummyComponent> = {
  component: DummyComponent,
  title: 'SmartList',
  // argTypes: {
  //   minItems: { control: 'number' }
  // }
};
export default meta;
type Story = StoryObj<DummyComponent>;

export const Primary: Story = {
  args: {
    minItems: 4
  }
}
