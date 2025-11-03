import { Component, OnInit  , NgZone} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { skis } from 'src/assets/jsons/skis';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {


  private animationItem!: AnimationItem;
  private animationItem2!: AnimationItem;
  
  options: AnimationOptions = {
    
    autoplay:true,
    path: '../../../assets/jsons/animation/1/1.json',
  
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
  constructor(private ngZone: NgZone , private router: Router) {
    
  }
  
  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    
  }
  animationCreated2(animationItem: AnimationItem): void {
    this.animationItem2 = animationItem;
    
  }

  ngOnInit(): void {
    
  }





  

}

