import { Component, OnInit } from '@angular/core';



@Component({
    selector: 'app-ski-form',
    templateUrl: './ski-form.component.html',
    styleUrls: ['./ski-form.component.scss'],
    standalone: false
})
export class SkiFormComponent implements OnInit {



  public loadScript1() {

    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = '../../assets/js/script.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
    
    let body1 = <HTMLDivElement> document.body;
    let script1 = document.createElement('script');
    script1.innerHTML = '';
    script1.src = '../../assets/js/script.js';
    script1.async = true;
    script1.defer = true;
    body1.appendChild(script1);

   
    let body2 = <HTMLDivElement> document.body;
    let link = document.createElement('link');
    script1.innerHTML = '';
    link.href = '../../assets/css/style.css';
    body2.appendChild(link);



}











 constructor() { }

 ngOnInit(
 

 ): void {
  this.loadScript1()
 }

 
 


 


}