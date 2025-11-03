import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkiFormComponent } from './ski-form/ski-form.component';
import { TopComponent } from './top/top.component';
import { Step1Component } from './ski-form/step1/step1.component';
import { Step2Component } from './ski-form/step2/step2.component';
import { Step3Component } from './ski-form/step3/step3.component';
import { Step4Component } from './ski-form/step4/step4.component';
import { Step5Component } from './ski-form/step5/step5.component';
import { Step6Component } from './ski-form/step6/step6.component';
import { ChooseYourGearComponent } from './choose-your-gear/choose-your-gear.component';
import { SplitFormComponent } from './split-form/split-form.component';
import { HomeComponent } from './home/home.component';
import { SkiResultComponent } from './ski-result/ski-result.component';
import { SplitTerrainComponent } from './ski-form/split-terrain/split-terrain.component';
import { SplitStyleComponent } from './ski-form/split-style/split-style.component';
import { SplitResultComponent } from './ski-form/split-result/split-result.component';
import { SplitStep6Component } from './split-form/split-step6/split-step6.component';
import { SplitStep2Component } from './split-form/split-step2/split-step2.component';
import { SplitSnowStepComponent } from './split-form/split-snow-step/split-snow-step.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { HomeAnimationComponent } from './animation/home-animation/home-animation.component';
import { SplitStep1Component } from './ski-form/split-step1/split-step1.component';
import { SplitStep5Component } from './ski-form/split-step5/split-step5.component';
import { CarouselModule } from '@marcreichel/angular-carousel';


import { environment } from '../environments/environment';


export function playerFactory() {
  return player;
}







@NgModule({
  declarations: [
    AppComponent,
    SkiFormComponent,
    TopComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    ChooseYourGearComponent,
    SplitFormComponent,
    HomeComponent,
    SkiResultComponent,
    SplitTerrainComponent,
    SplitStyleComponent,
    SplitResultComponent,
    SplitStep6Component,
    SplitStep2Component,
    SplitSnowStepComponent,
    HomeAnimationComponent,
    SplitStep1Component,
    SplitStep5Component,
   
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CarouselModule,
    AppRoutingModule,

    
  
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
