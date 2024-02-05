import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ShowMoreListDirective } from '@show-more-list/show-more-list';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, ShowMoreListDirective],
  selector: 'show-more-list-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'show-more-list-app';
}
