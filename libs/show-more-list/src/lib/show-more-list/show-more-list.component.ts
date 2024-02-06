import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'show-more-list-show-more-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-more-list.component.html',
  styleUrls: ['./show-more-list.component.scss'],
})
export class ShowMoreListComponent implements AfterViewInit, OnDestroy {

  @Input() templateRef!: TemplateRef<any>;
  @Input() minItems!: number;
  @Input() showMoreText = 'Show more';
  @Input() showLessText = 'Show less';

  showToggle!: boolean;
  toggle = false;

  private mutationObserver = new MutationObserver(this.initializeToggleOption.bind(this));

  constructor(
    private element: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.initializeToggleOption();
    this.cdr.detectChanges();
    this.mutationObserver.observe(this.element.nativeElement.querySelector('ul'), {childList: true});
  }

  ngOnDestroy(): void {
    this.mutationObserver.disconnect();
  }

  toggleShowMore(showMore?: boolean): void {
    this.toggle = showMore !== undefined ? showMore : !this.toggle;
    const liTags = this.element.nativeElement.querySelectorAll('li');
    for(let i = this.minItems; i < liTags.length; i++) {
      (liTags.item(i) as HTMLElement).style.display = this.toggle ? '' : 'none';
    }
  }

  private initializeToggleOption(): void {
    const totalLiTags = this.element.nativeElement.querySelectorAll('li').length;
    this.showToggle = totalLiTags > this.minItems;
    if(this.showToggle) {
      this.toggleShowMore(this.toggle);
    }
  }

}
