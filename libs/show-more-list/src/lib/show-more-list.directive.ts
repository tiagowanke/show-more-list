import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ShowMoreListComponent } from './show-more-list/show-more-list.component';

/**
 * Directive to be used in `<ul>` tag to add Show more/less options.
 *
 * ```html
 * <ul *showMoreList="2;showMoreText:'optional custom show more link';showLessText:'optional custom show less link'">
 *   <li *ngFor="let item of items">{{item}}</li>
 * </ul>
 * ```
 */
@Directive({
  selector: '[showMoreList]',
  standalone: true,
})
export class ShowMoreListDirective implements OnInit {

  @Input('showMoreList') count!: number;
  @Input() showMoreListShowMoreText?: string;
  @Input() showMoreListShowLessText?: string;

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>) {
  }

  ngOnInit(): void {
    const componentRef = this.view.createComponent(ShowMoreListComponent);
    componentRef.instance.templateRef = this.template;
    componentRef.instance.minItems = this.count;
    if(this.showMoreListShowMoreText) {
      componentRef.instance.showMoreText = this.showMoreListShowMoreText;
    }

    if(this.showMoreListShowLessText) {
      componentRef.instance.showLessText = this.showMoreListShowLessText;
    }
  }
}
