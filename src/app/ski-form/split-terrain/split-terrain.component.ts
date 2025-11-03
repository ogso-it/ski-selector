import { Component, OnInit  , NgZone} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { skis } from 'src/assets/jsons/skis';
import { DataServiceService } from 'src/app/data-service.service';


@Component({
    selector: 'app-split-terrain',
    templateUrl: './split-terrain.component.html',
    styleUrls: ['./split-terrain.component.css'],
    standalone: false
})
export class SplitTerrainComponent implements OnInit  {
  check : any 
  type_terrain : any 
  tr : any 
  

  private animationItem!: AnimationItem;
  
  options: AnimationOptions = {
    
    autoplay:false,
    path: '../../../assets/jsons/animation/split/5/5.json',
  
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
   }
 
 
     
    arrayRemove(arr : any , value : any) { 
     
     return arr.filter(function(ele : any){ 
         return ele != value; 
     });
 }
 
 sendNewData(data: any) {
   this.dataService.sendData4(data);
 }
 
   checkCheckBoxvalue(event : any ){
    if (event.target.checked){
      this.stop()
      this.play()
      setTimeout(()=>{
       this.stop()
      },1500)
     this.tr = true ;
       console.log(event.target.value)
  }
  else {
   this.tr = false ;
  }
  this.sendNewData(event.target.value)
   }
   
   
   
 
 
 }
 
