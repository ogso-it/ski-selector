import { Component, OnInit  , NgZone} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { skis } from 'src/assets/jsons/skis';
import { DataServiceService } from 'src/app/data-service.service';


@Component({
    selector: 'app-step1',
    templateUrl: './step1.component.html',
    styleUrls: ['./step1.component.scss'],
    standalone: false
})
export class Step1Component implements OnInit {



  private animationItem!: AnimationItem;
  
  options: AnimationOptions = {
    
    autoplay:false,
    path: '../../../assets/jsons/animation/2/2.json',
  
  };





  updateAnimation(): void {


    this.options = {
      
      ...this.options, // In case you have other properties that you want to copy
      path: '../../../assets/jsons/animation/2/2.json',
     

  }
  }

  
  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    
  }


















  height : any = "Slide me";
  weight : any = "Slide me";
  tr1 : any = false ;
  tr2 : any = false ;
  dur = "0s" ;


 constructor (private  dataService: DataServiceService  ,private ngZone: NgZone , private router: Router) { }

 play(): void {
  this.ngZone.runOutsideAngular(() => {
    this.animationItem.play();
  });
}

stop(): void {
  this.ngZone.runOutsideAngular(() => {
    this.animationItem.pause();
  });
}





 ngOnInit(
  

 ): void {
  this.animationCreated(this.animationItem)
 }

 
 HeightChanged(e : any ) {
   this.height = parseInt(e.target.value)+130 +" cm"
   this.tr1 = true 
   this.dur = "10s"
   this.sendHeight(parseInt(e.target.value)+130)
   this.stop()
   this.play()
   setTimeout(()=>{
    this.stop()
   },1500)
  
 }


 WeightChanged(e : any ) {
   this.weight = parseInt(e.target.value)+30 + " Kg"
   this.tr2 = true
   this.sendWeight(parseInt(e.target.value)+30)
   this.stop()
   this.play()
   setTimeout(()=>{
    this.stop()
   },1500)
  
 }

//console.log('TEST')
verif(){
  return this.tr1 && this.tr2
}


sendHeight(data: any) {
  this.dataService.sendData(data);
}


sendWeight(data: any) {
  this.dataService.sendData2(data);
}



}
