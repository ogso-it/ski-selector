import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseYourGearComponent } from './choose-your-gear/choose-your-gear.component';
import { HomeComponent } from './home/home.component';
import { SkiResultComponent } from './ski-result/ski-result.component';
import { SkiLayoutComponent } from './layout/ski-layout/ski-layout';
import { Step1Component } from './ski-form/step1/step1.component';
import { Step2Component } from './ski-form/step2/step2.component';
import { Step3Component } from './ski-form/step3/step3.component';
import { Step4Component } from './ski-form/step4/step4.component';
import { Step5Component } from './ski-form/step5/step5.component';
import { Step6Component } from './ski-form/step6/step6.component';
import { Step7Component } from './ski-form/step7/step7.component';

const routes: Routes = [

  // Routes avec le layout (pour les steps)
  {
    path: '',
    component: SkiLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'choose-your-gear', component: ChooseYourGearComponent },
      { path: 'ski/step1', component: Step1Component },
      { path: 'ski/step2', component: Step2Component },
      { path: 'ski/step3', component: Step3Component },
      { path: 'ski/step4', component: Step4Component },
      { path: 'ski/step5', component: Step5Component },
      { path: 'ski/step6', component: Step6Component },
      { path: 'ski/step7', component: Step7Component },
    ]
  },

  // Route indépendante pour les résultats (SANS le layout)
  { path: 'recommanded-skis', component: SkiResultComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }