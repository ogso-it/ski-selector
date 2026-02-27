import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SkiLayoutComponent } from './layout/ski-layout/ski-layout';

import { SkiFormComponent } from './ski-form/ski-form.component';
import { Step1Component } from './ski-form/step1/step1.component';
import { Step2Component } from './ski-form/step2/step2.component';
import { Step3Component } from './ski-form/step3/step3.component';
import { Step4Component } from './ski-form/step4/step4.component';
import { Step5Component } from './ski-form/step5/step5.component';
import { Step6Component } from './ski-form/step6/step6.component';
import { Step7Component } from './ski-form/step7/step7.component';  // ← AJOUTER CETTE LIGNE


import { SkiResultComponent } from './ski-result/ski-result.component';
import { ChooseYourGearComponent } from './choose-your-gear/choose-your-gear.component';

import { HomeAnimationComponent } from './animation/home-animation/home-animation.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LottiePlayerComponent } from './lottie-player/lottie-player.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SkiLayoutComponent,

    SkiFormComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step7Component,

    SkiResultComponent,
    ChooseYourGearComponent,
    HomeAnimationComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    // Standalone component
    LottiePlayerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
