import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkiLayoutComponent } from './ski-layout';

describe('SkiLayoutComponent', () => {
  let component: SkiLayoutComponent;
  let fixture: ComponentFixture<SkiLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkiLayoutComponent] // si standalone
      // declarations: [SkiLayoutComponent] // si pas standalone
    }).compileComponents();

    fixture = TestBed.createComponent(SkiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});