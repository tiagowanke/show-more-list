import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowMoreListComponent } from './show-more-list.component';

describe('ShowMoreListComponent', () => {
  let component: ShowMoreListComponent;
  let fixture: ComponentFixture<ShowMoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMoreListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowMoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
