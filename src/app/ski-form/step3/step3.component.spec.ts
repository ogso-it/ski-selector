import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Step3Component } from './step3.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataServiceService } from 'src/app/data-service.service';

describe('Step3Component', () => {
  let component: Step3Component;
  let fixture: ComponentFixture<Step3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step3Component],
      imports: [RouterTestingModule],
      providers: [DataServiceService]
    }).compileComponents();

    fixture = TestBed.createComponent(Step3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select technique', () => {
    component.onTechniqueChange('freeride');
    expect(component.selectedTechnique).toBe('freeride');
  });

  it('should not navigate if no technique selected', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.next();
    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should navigate when technique selected', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.onTechniqueChange('all-mountain');
    component.next();
    expect(routerSpy).toHaveBeenCalledWith(['/ski/step4']);
  });

  it('should navigate to step2 on prev', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.prev();
    expect(routerSpy).toHaveBeenCalledWith(['/ski/step2']);
  });
});