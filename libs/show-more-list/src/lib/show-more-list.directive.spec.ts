import { ShowMoreListDirective } from './show-more-list.directive';
import { ShowMoreListComponent } from './show-more-list/show-more-list.component';

describe('ShowMoreListDirective', () => {

  let directive: ShowMoreListDirective;
  let viewSpy: any;
  let templateRefSpy: any;

  beforeEach(async () => {
    viewSpy = {
      createComponent: jest.fn()
    };
    templateRefSpy = {};
    directive = new ShowMoreListDirective(viewSpy, templateRefSpy);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('#ngOnInit()', () => {

    let componentRefMock: any;

    beforeEach(() => {
      componentRefMock = {
        instance: {} as ShowMoreListComponent
      } ;
      viewSpy.createComponent.mockReturnValue(componentRefMock)
    });

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

});
