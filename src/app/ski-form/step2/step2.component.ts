import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
  standalone: false
})
export class Step2Component implements OnInit {
  selectedLevel: string = '';

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    // Load saved value from service
    const profile = this.dataService.profile;
    if (profile.skiLevel) {
      this.selectedLevel = profile.skiLevel;
    }
  }

  onLevelChange(level: string): void {
    this.selectedLevel = level;
    this.dataService.setSkiLevel(level);
    console.log('Selected level:', level);
  }

  prev(): void {
    try {
      this.router.navigate(['/ski/step1']).catch(error => {
        this.errorHandler.handleNavigationError(error, 'Failed to navigate to previous step');
      });
    } catch (error) {
      this.errorHandler.handleServiceError(error, 'Step2 Navigation');
    }
  }

  next(): void {
    try {
      if (!this.selectedLevel) {
        this.errorHandler.addValidationError('Please select a ski level to continue');
        return;
      }

      this.dataService.setSkiLevel(this.selectedLevel);
      
      this.router.navigate(['/ski/step3']).catch(error => {
        this.errorHandler.handleNavigationError(error, 'Failed to navigate to next step');
      });
    } catch (error) {
      this.errorHandler.handleServiceError(error, 'Step2');
    }
  }
}