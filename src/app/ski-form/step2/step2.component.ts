
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataServiceService } from 'src/app/data-service.service';
import { Component, OnInit  , NgZone} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { skis } from 'src/assets/jsons/skis';



@Component({
    selector: 'app-step2',
    templateUrl: './step2.component.html',
    styleUrls: ['./step2.component.css'],
    standalone: false
})
export class Step2Component implements OnInit {


  private animationItem!: AnimationItem;
  private animationItem2!: AnimationItem;
  
  options: AnimationOptions = {
    
    autoplay:false,
    path: '../../../assets/jsons/animation/3/3.json',
  
  };


  options2: AnimationOptions = {
    
    autoplay:true,
    path: '../../../assets/jsons/animation/1/1.json',
  
  };


  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    
  }
  

  updateAnimation(): void {


    this.options = {
      
      ...this.options, // In case you have other properties that you want to copy
      path: '../../../assets/jsons/animation/test.json',
     

  }
  }



  ski_level = new FormControl('');
  contentEditable: boolean = false ;


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


  toggleEditable(event : any) {
    if ( event.target.checked ) {
      this.stop()
      this.play()
      setTimeout(()=>{
       this.stop()
      },1500)
     
        this.contentEditable = true;
        //console.log(event.target.value)
        this.sendSkiLevel(event.target.value)
   }
}

sendSkiLevel(data: any) {
  this.dataService.sendData3(data);
}


}
