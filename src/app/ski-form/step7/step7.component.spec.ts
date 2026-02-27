import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Step7Component } from './step7.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataServiceService } from 'src/app/data-service.service';

describe('Step7Component', () => {
  let component: Step7Component;
  let fixture: ComponentFixture<Step7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step7Component],
      imports: [RouterTestingModule],
      providers: [DataServiceService]
    }).compileComponents();

    fixture = TestBed.createComponent(Step7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select skiing style', () => {
    component.onStyleChange('technical-precision');
    expect(component.selectedStyle).toBe('technical-precision');
    expect(component.hidden).toBeTrue();
  });

  it('should not navigate if no style selected', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.next();
    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should navigate to results page when style selected', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.onStyleChange('fun-surf');
    component.next();
    expect(routerSpy).toHaveBeenCalledWith(['/recommanded-skis']);
  });

  it('should navigate to step6 on prev', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.prev();
    expect(routerSpy).toHaveBeenCalledWith(['/ski/step6']);
  });
});