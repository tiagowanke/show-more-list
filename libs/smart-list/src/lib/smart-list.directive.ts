import { ComponentRef, Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { SmartListComponent } from './smart-list/smart-list.component';

/**
 * Directive to be used in `<ul>` tag to add Show more/less options.
 *
 * This directive will update when the count and/or the `<li>` elements changes.
 *
 * @param count Amount of `<li>` that will be shown when is showing less.
 * @param showMoreText Text shown when the elements are hidden. Default value `Show more`
 * @param showLessText Text shown when all the elements are shown. Default value `Show less`
 * @param showLess Starting state, true will hide the `<li>`, false will show. Default value `true`
 * @usageNotes
 * Add the directive to your `<ul>` with the max amount of items to be show
 * ```html
 * <ul *showMoreList="2">
 *    <li>Item 1</li>
 *    <li>Item 2</li>
 *    <li>Item 3</li> <!-- this will not be shown -->
 * </ul>
 * ```
 * To use a param, use the Angular's directive sintax
 * ```html
 * <ul *showMoreList="2;showLess:false">
 * ```
 */
@Directive({
  selector: '[smartList]',
  standalone: true,
})
export class SmartListDirective implements OnInit, OnChanges {

  @Input('smartList') count!: number;
  @Input() showMoreListShowLess?: boolean;
  @Input() showMoreListShowMoreText?: string;
  @Input() showMoreListShowLessText?: string;

  private componentRef!: ComponentRef<SmartListComponent>;

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>) {
  }

  ngOnInit(): void {
    this.componentRef = this.view.createComponent(SmartListComponent);
    this.componentRef.instance.templateRef = this.template;
    this.componentRef.instance.minItems = this.count;

    if(this.showMoreListShowLess !== undefined) {
      this.componentRef.instance.showLess = this.showMoreListShowLess;
    }

    if(this.showMoreListShowMoreText) {
      this.componentRef.instance.showMoreText = this.showMoreListShowMoreText;
    }

    if(this.showMoreListShowLessText) {
      this.componentRef.instance.showLessText = this.showMoreListShowLessText;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.componentRef && changes['count']) {
      this.componentRef.instance.minItems = changes['count'].currentValue;
      // this.componentRef.instance.minItems = this.count;
    }
  }
}
