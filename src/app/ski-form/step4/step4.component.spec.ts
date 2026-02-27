import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Step4Component } from './step4.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataServiceService } from 'src/app/data-service.service';

describe('Step4Component', () => {
  let component: Step4Component;
  let fixture: ComponentFixture<Step4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step4Component],
      imports: [RouterTestingModule],
      providers: [DataServiceService]
    }).compileComponents();

    fixture = TestBed.createComponent(Step4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select snow type', () => {
    component.onSnowTypeChange('powder');
    expect(component.type_snow).toBe('powder');
    expect(component.hidden).toBeTrue();
  });

  it('should not navigate if no snow type selected', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.next();
    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should navigate when snow type selected', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.onSnowTypeChange('hard');
    component.next();
    expect(routerSpy).toHaveBeenCalledWith(['/ski/step5']);
  });

  it('should navigate to step3 on prev', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.prev();
    expect(routerSpy).toHaveBeenCalledWith(['/ski/step3']);
  });
});