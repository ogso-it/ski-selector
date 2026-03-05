import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css'],
  standalone: false
})
export class Step3Component {
  selectedTechnique: string = '';

  constructor(
    private dataService: DataServiceService,
    private router: Router
  ) {}

  onTechniqueChange(technique: string) {
    this.selectedTechnique = technique;
    this.dataService.setTerrainType(technique);
    console.log('Technique selected:', technique);
  }

  prev() {
    this.router.navigate(['/ski/step2']);
  }

  next() {
    if (this.selectedTechnique) {
      this.router.navigate(['/ski/step4']);
    }
  }
}
