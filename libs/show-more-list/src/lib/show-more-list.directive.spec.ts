import { SimpleChange, SimpleChanges } from '@angular/core';
import { ShowMoreListDirective } from './show-more-list.directive';
import { ShowMoreListComponent } from './show-more-list/show-more-list.component';

describe('ShowMoreListDirective', () => {

  let directive: ShowMoreListDirective;
  let viewSpy: any;
  let templateRefSpy: any;
  let componentRefMock: any;

  beforeEach(async () => {
    componentRefMock = {
      instance: {} as ShowMoreListComponent
    } ;
    viewSpy = {
      createComponent: jest.fn().mockReturnValue(componentRefMock)
    };
    templateRefSpy = {};
    directive = new ShowMoreListDirective(viewSpy, templateRefSpy);
    directive.ngOnInit();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('#ngOnInit()', () => {
    it('should create gear show more list component', () => {
      directive.ngOnInit();
      expect(viewSpy.createComponent).toHaveBeenCalledWith(ShowMoreListComponent);
    })

    it('should set template ref', () => {
      directive.ngOnInit();
      expect(componentRefMock.instance.templateRef).toBe(templateRefSpy)
    });

    it('should set minItems', () => {
      directive.ngOnInit();
      expect(componentRefMock.instance.minItems).toBe(directive.count);
    });

    describe('when showLess flag is given', () => {

      describe('and is true', () => {

        beforeEach(() => {
          directive.showMoreListShowLess = true
        });

        it('should show less items by default', () => {
          directive.ngOnInit();
          expect(componentRefMock.instance.showLess).toBe(true);
        });
      });

      describe('and is false', () => {

        beforeEach(() => {
          directive.showMoreListShowLess = false
        });

        it('should not show less items by default', () => {
          directive.ngOnInit();
          expect(componentRefMock.instance.showLess).toBe(false);
        });
      });
    });

    describe('when show more text is given', () => {

      beforeEach(() => {
        directive.showMoreListShowMoreText = 'my show more text';
      })

      it('should set show more text', () => {
        directive.ngOnInit();
        expect(componentRefMock.instance.showMoreText).toBe(directive.showMoreListShowMoreText);
      });
    });

    describe('when no show more text is given', () => {

      beforeEach(() => {
        delete directive.showMoreListShowMoreText;
      })

      it('should not change show more text', () => {
        componentRefMock.instance.showMoreText = 'should not change'
        directive.ngOnInit();
        expect(componentRefMock.instance.showMoreText).toBe('should not change');
      });
    });

    describe('when show less text is given', () => {

      beforeEach(() => {
        directive.showMoreListShowLessText = 'my show less text';
      })

      it('should set show less text', () => {
        directive.ngOnInit();
        expect(componentRefMock.instance.showLessText).toBe(directive.showMoreListShowLessText);
      });
    })

    describe('when no show less text is given', () => {

      beforeEach(() => {
        delete directive.showMoreListShowLessText;
      })

      it('should not change show less text', () => {
        componentRefMock.instance.showLessText = 'should not change'
        directive.ngOnInit();
        expect(componentRefMock.instance.showLessText).toBe('should not change');
      });
    })
  });

  describe('#ngOnChanges()', () => {

    let simpleChangesMock: SimpleChanges


    describe('when there is a componentRef', () => {
      describe('and count is changed', () => {

        beforeEach(() => {
          simpleChangesMock = {
            count: new SimpleChange(0, 3, true)
          };
        });

        it(`should update component's mint items`, () => {
          directive.ngOnChanges(simpleChangesMock);
          expect(componentRefMock.instance.minItems).toBe(3);
        });
      })
    });

  });

});
