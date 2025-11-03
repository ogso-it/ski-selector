
import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
    selector: 'app-home-animation',
    templateUrl: './home-animation.component.html',
    styleUrls: ['./home-animation.component.css'],
    standalone: false
})
export class HomeAnimationComponent implements OnInit {

  options: AnimationOptions = {
    path: '../../../assets/jsons/animation/test.json',
  };










  
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  updateAnimation(): void {


    this.options = {
    
      ...this.options, // In case you have other properties that you want to copy
      path: '../../../assets/jsons/animation/test.json',
     

  }
  }
  constructor() { }

  ngOnInit(): void {
  }

}

