import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Step2Component } from './step2.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataServiceService } from 'src/app/data-service.service';

describe('Step2Component', () => {
  let component: Step2Component;
  let fixture: ComponentFixture<Step2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step2Component],
      imports: [RouterTestingModule],
      providers: [DataServiceService]
    }).compileComponents();

    fixture = TestBed.createComponent(Step2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select level', () => {
    component.onLevelChange('newbie');
    expect(component.selectedLevel).toBe('newbie');
  });

  it('should not navigate if no level selected', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.next();
    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should navigate when level selected', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.onLevelChange('pro-guide');
    component.next();
    expect(routerSpy).toHaveBeenCalledWith(['/ski/step3']);
  });

  it('should navigate to step1 on prev', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.prev();
    expect(routerSpy).toHaveBeenCalledWith(['/ski/step1']);
  });
});