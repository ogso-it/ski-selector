import { Component, OnInit  , NgZone} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { skis } from 'src/assets/jsons/skis';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
    selector: 'app-split-step5',
    templateUrl: './split-step5.component.html',
    styleUrls: ['./split-step5.component.css'],
    standalone: false
})
export class SplitStep5Component implements OnInit {








  private animationItem!: AnimationItem;
  
  options: AnimationOptions = {
    
    autoplay:false,
    path: '../../../assets/jsons/animation/split/8/8.json',
  
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












  hidden : any ;
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



  ngOnInit(): void {
   // this.getData()
  }


  checkCheckBoxvalue1(event : any ){

    this.checkchecked(event.target.value)
    this.stop()
    this.play()
    setTimeout(()=>{
     this.stop()
    },1500)
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
