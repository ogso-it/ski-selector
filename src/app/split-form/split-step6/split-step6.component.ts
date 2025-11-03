import { Component, OnInit  , NgZone} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { skis } from 'src/assets/jsons/skis';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
    selector: 'app-split-step6',
    templateUrl: './split-step6.component.html',
    styleUrls: ['./split-step6.component.css'],
    standalone: false
})
export class SplitStep6Component implements OnInit {


  private animationItem!: AnimationItem;
  
  options: AnimationOptions = {
    
    autoplay:false,
    path: '../../../assets/jsons/animation/split/7/7.json',
  
  };


  options2: AnimationOptions = {
    
    autoplay:true,
    path: '../../../assets/jsons/animation/1/1.json',
  
  };


  updateAnimation(): void {


    this.options = {
      
      ...this.options, // In case you have other properties that you want to copy
      path: '../../../assets/jsons/animation/test.json',
     

  }
  }

  
  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    
  }



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



  hidden : any ;
   constructor (private  dataService: DataServiceService  ,private ngZone: NgZone , private router: Router) { }

  ngOnInit(): void {
   // this.getData()
  }


  checkCheckBoxvalue1(event : any ){
    this.stop()
    this.play()
    setTimeout(()=>{
     this.stop()
    },1500)
    this.checkchecked(event.target.value)
  }

  checkchecked( x : any ){
    if(x){
      this.hidden = true
    }
    else {
      this.hidden = false
    }
  } 

  sendNewData(data: any) {
    this.dataService.sendData3(data);
  }
}
