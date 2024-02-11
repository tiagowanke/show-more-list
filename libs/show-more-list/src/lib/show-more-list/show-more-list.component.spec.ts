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

  it('should have default showMoreText', () => {
    expect(component.showMoreText).toBe('Show more');
  });

  it('should have default showLessText', () => {
    expect(component.showLessText).toBe('Show less');
  });

  it('should show less by default', () => {
    expect(component.showLess).toBe(true);
  });

  describe('#set minItems()',() => {

    describe('when there are more li tags than min items', () => {

      beforeEach(() => {
        ul.append(document.createElement('li'));
        ul.append(document.createElement('li'));
        ul.append(document.createElement('li'));
        component.minItems = 2;
      });

      it('should hide exceeding li tags', () => {
        const updateVisibilitySpy = jest.spyOn(component, 'updateVisibility');
        component.ngAfterViewInit();
        expect(updateVisibilitySpy).toHaveBeenCalledWith(true);
      });
    });

    describe(`when the amount of li tags doesn't exceed the min items`, () => {

      beforeEach(() => {
        ul.append(document.createElement('li'));
        ul.append(document.createElement('li'));
        component.minItems = 2;
      });

      it('should hide exceeding li tags', () => {
        const updateVisibilitySpy = jest.spyOn(component, 'updateVisibility');
        component.ngAfterViewInit();
        expect(updateVisibilitySpy).toHaveBeenCalledWith(true);
      });
    });

    it('should detect changes', () => {
      component['cdr'] = changeDetectorRefSpy;
      component.ngAfterViewInit();
      expect(changeDetectorRefSpy.detectChanges).toHaveBeenCalledTimes(1);
    });
  });

  describe('#updateVisibility()', () => {

    beforeEach(() => {
      ul.append(document.createElement('li'));
      ul.append(document.createElement('li'));
      ul.append(document.createElement('li'));
      ul.append(document.createElement('li'));
      component.minItems = 2;
    })

    describe('when should not show less', () => {
      it('should show all li elements with position after min items', () => {
        component.updateVisibility(false);
        const hiddenElement = Array.from(ul.childNodes).find((li: any) => li.style.display !== '');
        expect(hiddenElement).toBeUndefined()
      });

      it('should update showLess flag to false', () => {
        component.updateVisibility(false);
        expect(component.showLess).toBe(false);
      });
    });

    describe('when should show less', () => {
      it('should show all li elements with position after min items', () => {
        component.updateVisibility(true)
        const hiddenElements = Array.from(ul.childNodes).filter((li: any) => li.style.display === 'none');
        expect(hiddenElements).toEqual([ul.childNodes[2], ul.childNodes[3]])
      });


      it('should update showLess flag to true', () => {
        component.updateVisibility(true);
        expect(component.showLess).toBe(true);
      });
    });
  });

  describe('#ngAfterViewInit()',() => {

    describe('when there are more li tags than min items', () => {

      beforeEach(() => {
        ul.append(document.createElement('li'));
        ul.append(document.createElement('li'));
        ul.append(document.createElement('li'));
        component.minItems = 2;
      });

      it('should hide exceeding li tags', () => {
        const updateVisibilitySpy = jest.spyOn(component, 'updateVisibility');
        component.ngAfterViewInit();
        expect(updateVisibilitySpy).toHaveBeenCalledWith(true);
      });
    });

    describe(`when the amount of li tags doesn't exceed the min items`, () => {

      beforeEach(() => {
        ul.append(document.createElement('li'));
        ul.append(document.createElement('li'));
        component.minItems = 2;
      });

     it('should hide exceeding li tags', () => {
        const updateVisibilitySpy = jest.spyOn(component, 'updateVisibility');
        component.ngAfterViewInit();
        expect(updateVisibilitySpy).toHaveBeenCalledWith(true);
      });
    });

    it('should detect changes', () => {
      component['cdr'] = changeDetectorRefSpy;
      component.ngAfterViewInit();
      expect(changeDetectorRefSpy.detectChanges).toHaveBeenCalledTimes(1);
    });
  });

});
