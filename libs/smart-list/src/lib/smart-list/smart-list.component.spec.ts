import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmartListComponent } from './smart-list.component';

describe('SmartListComponent', () => {
  let component: SmartListComponent;
  let fixture: ComponentFixture<SmartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
