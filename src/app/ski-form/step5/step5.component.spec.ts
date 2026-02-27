import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Step5Component } from './step5.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataServiceService } from 'src/app/data-service.service';

describe('Step5Component', () => {
  let component: Step5Component;
  let fixture: ComponentFixture<Step5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step5Component],
      imports: [RouterTestingModule],
      providers: [DataServiceService]
    }).compileComponents();

    fixture = TestBed.createComponent(Step5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select turn preference', () => {
    component.onTurnChange('short');
    expect(component.selectedTurn).toBe('short');
    expect(component.hidden).toBeTrue();
  });

  it('should not navigate if no preference selected', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.next();
    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should navigate to step6 when preference selected', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.onTurnChange('long');
    component.next();
    expect(routerSpy).toHaveBeenCalledWith(['/ski/step6']);
  });

  it('should navigate to step4 on prev', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.prev();
    expect(routerSpy).toHaveBeenCalledWith(['/ski/step4']);
  });
});