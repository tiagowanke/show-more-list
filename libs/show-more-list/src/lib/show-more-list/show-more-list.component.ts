import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, TemplateRef } from '@angular/core';

@Component({
  selector: 'show-more-list-show-more-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-more-list.component.html',
  styleUrls: ['./show-more-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowMoreListComponent implements AfterViewInit, OnDestroy {

  templateRef!: TemplateRef<any>;
  showMoreText = 'Show more';
  showLessText = 'Show less';

  /**
   * when true, hides the `<li>` with position afer minItems.
   */
  showLess = true;

  /**
   * True when the number of `<li>` exceeds the minItems.
   * If `<li>` <= minItems there is no need to show an option to hide/show.
   */
  showToggle!: boolean;

  private _minItems!: number;
  set minItems(minItems: number) {
    this._minItems = minItems;
    this.initializeToggleOption();
  }

  private mutationObserver = new MutationObserver(this.initializeToggleOption.bind(this));

  constructor(
    private element: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.initializeToggleOption();
    this.mutationObserver.observe(this.element.nativeElement.querySelector('ul'), {childList: true});
  }

  ngOnDestroy(): void {
    this.mutationObserver.disconnect();
  }

  /**
   * Shows/hide the `<li>`.
   *
   * @param showLess True, hide the `<li>`, false shows them.
   */
  updateVisibility(showLess: boolean): void {
    this.showLess = showLess;
    const liTags = this.element.nativeElement.querySelectorAll('li');
    Array.from<HTMLElement>(liTags).forEach((li: HTMLElement, i: number) => {
      // if should show less and the <li> is above the minItems, hide it
      li.style.display = this.showLess && i + 1 > this._minItems ? 'none' : '';
    });

  }

  private initializeToggleOption(): void {
    const totalLiTags = this.element.nativeElement.querySelectorAll('li').length;
    this.showToggle = totalLiTags > this._minItems;
    this.updateVisibility(this.showLess);
    this.cdr.detectChanges();
  }

}
