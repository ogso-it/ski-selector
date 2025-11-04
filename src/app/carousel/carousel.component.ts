import { Component } from '@angular/core';

@Component({
    selector: 'app-carousel',
    template: `
<div class="app-carousel">
  <ng-content></ng-content>
</div>
`,
    styles: [
`:host { display:block; width:100%; }
.app-carousel { width: 100%; overflow: hidden; }
`
    ],
    standalone: false
})
export class CarouselComponent {}
