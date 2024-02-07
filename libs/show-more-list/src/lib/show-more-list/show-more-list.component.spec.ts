import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowMoreListComponent } from './show-more-list.component';
import { ElementRef } from '@angular/core';

describe('ShowMoreListComponent', () => {
  let component: ShowMoreListComponent;
  let fixture: ComponentFixture<ShowMoreListComponent>;
  let elementMock: ElementRef;
  let ul: HTMLUListElement;

  let changeDetectorRefSpy: any;

  beforeEach(async () => {

    changeDetectorRefSpy = {
      detectChanges: jest.fn()
    }

    ul = document.createElement('ul');
    elementMock = {
      nativeElement: {
        querySelector: () => ul,
        querySelectorAll: () => ul.children
      }
    } as ElementRef;


    await TestBed.configureTestingModule({
      imports: [ShowMoreListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowMoreListComponent);
    component = fixture.componentInstance;
    component['element'] = elementMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngAfterViewInit()',() => {

    describe('when there are more <li> tags than given min items', () => {

      beforeEach(() => {
        component.minItems = 2;
        ul.appendChild(document.createElement('li'));
        ul.appendChild(document.createElement('li'));
        ul.appendChild(document.createElement('li'));
      });

      it('should show toggle option', () => {
        component.ngAfterViewInit();
        expect(component.showToggle).toBe(true);
      });

      it('should toggle show more', () => {
        const toogleSpy = jest.spyOn(component, 'toggleShowMore');
        component.ngAfterViewInit();
        expect(toogleSpy).toHaveBeenCalledWith(component.toggle);
      });
    });

    describe('when there are is the same amount of <li> tags as the given min items', () => {

      beforeEach(() => {
        component.minItems = 2;
        ul.appendChild(document.createElement('li'));
        ul.appendChild(document.createElement('li'));
      });

      it('should not show toggle option', () => {
        component.ngAfterViewInit();
        expect(component.showToggle).toBe(false);
      });

      it('should not toggle show more', () => {
        const toogleSpy = jest.spyOn(component, 'toggleShowMore');
        component.ngAfterViewInit();
        expect(toogleSpy).not.toHaveBeenCalled();
      });
    });

    it('should detect changes', () => {
      component['cdr'] = changeDetectorRefSpy;
      component.ngAfterViewInit();
      expect(changeDetectorRefSpy.detectChanges).toHaveBeenCalledTimes(1);
    });
  });

  describe('#toggleShowMore()', () => {

    describe('when show more flag is given', () => {

      it('should set toggle to the same value as show more flag', () => {
        component.toggle = true;
        component.toggleShowMore(false);
        expect(component.toggle).toBe(false);
      });
    })

    describe('when show more flag is not given', () => {

      describe('and current toggle is true', () => {

        beforeEach(() => {
          component.toggle = true;
        });

        it('should set toggle to false', () => {
          component.toggleShowMore()
          expect(component.toggle).toBe(false);
        });
      });

      describe('and current toggle is false', () => {

        beforeEach(() => {
          component.toggle = false;
        });

        it('should set toggle to true', () => {
          component.toggleShowMore()
          expect(component.toggle).toBe(true);
        });
      });


      describe('when should show more', () => {
        it('should show all li elements with position after min items', () => {
          component.minItems = 2;
          ul.append(document.createElement('li'));
          ul.append(document.createElement('li'));
          ul.append(document.createElement('li'));
          component.toggleShowMore(true);
          const hiddenElement = Array.from(ul.childNodes).find((li: any) => li.style.display !== '');
          expect(hiddenElement).toBeUndefined()
        });
      })

      describe('when should show less', () => {
        it('should hide all li elements with position after in items', () => {
          component.minItems = 2;
          ul.append(document.createElement('li'));
          ul.append(document.createElement('li'));
          ul.append(document.createElement('li'));
          ul.append(document.createElement('li'));
          component.toggleShowMore(false);
          const hiddenElements = Array.from(ul.childNodes).filter((li: any) => li.style.display === 'none');
          expect(hiddenElements).toEqual([ul.childNodes[2], ul.childNodes[3]])
        });
      })
    });
  });
});
