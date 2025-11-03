import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-split-form',
    templateUrl: './split-form.component.html',
    styleUrls: ['./split-form.component.css'],
    standalone: false
})
export class SplitFormComponent implements OnInit {

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

   

}


  constructor() { }

  ngOnInit(): void {
    this.loadScript1()
  }

}
