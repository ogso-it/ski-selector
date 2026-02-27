import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
  standalone: false
})
export class Step1Component implements OnInit {

  height: number = 178;
  weight: number = 75;
  
  // Height and weight constraints
  private readonly HEIGHT_MIN = 140;
  private readonly HEIGHT_MAX = 220;
  private readonly WEIGHT_MIN = 40;
  private readonly WEIGHT_MAX = 150;

  constructor(
    private dataService: DataServiceService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    // Load saved values from service if available
    const profile = this.dataService.profile;
    if (profile.height && profile.height > 0) {
      this.height = profile.height;
    }
    if (profile.weight && profile.weight > 0) {
      this.weight = profile.weight;
    }
  }

  /* ===== HEIGHT CHANGE (FAST DOM) ===== */
  onHeightChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.height = parseInt(input.value, 10);
  }

  /* ===== WEIGHT CHANGE (FAST DOM) ===== */
  onWeightChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.weight = parseInt(input.value, 10);
  }

  /* ===== VALIDATION ===== */
  private isValid(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.height || this.height < this.HEIGHT_MIN || this.height > this.HEIGHT_MAX) {
      errors.push(`Height must be between ${this.HEIGHT_MIN}cm and ${this.HEIGHT_MAX}cm`);
    }

    if (!this.weight || this.weight < this.WEIGHT_MIN || this.weight > this.WEIGHT_MAX) {
      errors.push(`Weight must be between ${this.WEIGHT_MIN}kg and ${this.WEIGHT_MAX}kg`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /* ===== NEXT STEP ===== */
  next(): void {
    try {
      const validation = this.isValid();
      
      if (!validation.valid) {
        // Show all validation errors
        validation.errors.forEach(error => {
          this.errorHandler.addValidationError(error);
        });
        return; // Prevent navigation
      }

      // Enregistrer dans le service
      this.dataService.setHeight(this.height);
      this.dataService.setWeight(this.weight);

      // Navigation
      this.router.navigate(['/ski/step2']).catch(error => {
        this.errorHandler.handleNavigationError(error, 'Failed to navigate to next step');
      });
    } catch (error) {
      this.errorHandler.handleServiceError(error, 'Step1');
    }
  }
}
