import { Component, OnInit  , NgZone} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { skis } from 'src/assets/jsons/skis';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
    selector: 'app-split-snow-step',
    templateUrl: './split-snow-step.component.html',
    styleUrls: ['./split-snow-step.component.css'],
    standalone: false
})
export class SplitSnowStepComponent implements OnInit {

 
  hidden : any  = null;
  type_snow : any = null
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  show4!: boolean;
  show5!: boolean;
  private animationItem!: AnimationItem;
  
  options: AnimationOptions = {
    
    autoplay:false,
    path: '../../../assets/jsons/animation/split/4/4.json',
  
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
    this.getData()
  }

  arrayRemove(arr : any , value : any) { 
    
    return arr.filter(function(ele : any){ 
        return ele != value; 
    });
}


sendNewData(data: any) {
  this.dataService.sendDataT(data);
}

  checkCheckBoxvalue1(event : any ){

    this.checkchecked(event.target.value)

    if (event.target.checked){
      this.stop()
      this.play()
      setTimeout(()=>{
       this.stop()
      },1500)
      this.type_snow = event.target.value
      console.log(this.type_snow)
     } 
     
  
  
     
   
    

    this.getData()  
  // console.log(this.type_snow)
  this.sendNewData(this.type_snow)

  }

getData(){
  this.dataService.terrain_type$.subscribe((response: string | null) => {
//  console.log(response);  // you will receive the data from sender component here.
  
    this.checkShow(response)
   
  });
}



checkchecked( x : any ){
  if(x){
    this.hidden = true
  }
  else {
    this.hidden = false
  }
} 


  checkShow (e : any ){
    if (e == 'touring-back-mountain'){
      this.show1 = true
    }
    else {
     this.show1 = false
    }
    if (e == 'touring-front-mountain'){
      this.show2 = true
    }
    else {
     this.show2 = false
    }
    if (e == 'touring-race'){
      this.show3 = true
    }
    else {
     this.show3 = false
    }
    if (e == 'touring-mountaineering'){
      this.show4 = true
    }
    else {
      this.show4 = false
    }
    if (e == 'all-mountain'){
      this.show5 = true
    }
    else {
     this.show5 = false
    }
  }


}
