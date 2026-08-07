import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { Router } from '@angular/router';

import { DataServiceService } from 'src/app/data-service.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
  standalone: false
})
export class Step2Component
  implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('skiVideo')
  skiVideo!: ElementRef<HTMLVideoElement>;

  selectedLevel = '';

  private readonly appearanceVideoSource =
    'assets/images/apparence2.webm';

  private isDestroyed = false;

  private videoEndedHandler?: () => void;

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.restoreSavedLevel();
  }

  ngAfterViewInit(): void {
    this.initializeVideo();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.cleanVideo();
  }

  private restoreSavedLevel(): void {
    try {
      const profile = this.dataService.profile;

      if (profile?.skiLevel) {
        this.selectedLevel = profile.skiLevel;
      }
    } catch (error) {
      this.errorHandler.handleServiceError(
        error,
        'Unable to restore the selected ski level'
      );
    }
  }

  private initializeVideo(): void {
    const video = this.skiVideo?.nativeElement;

    if (!video) {
      return;
    }

    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.loop = false;

    video.src = this.appearanceVideoSource;
    video.load();

    this.videoEndedHandler = () => {
      if (this.isDestroyed) {
        return;
      }

      this.freezeVideoOnLastFrame();
    };

    video.addEventListener(
      'ended',
      this.videoEndedHandler
    );

    video.play().catch(error => {
      this.errorHandler.handleServiceError(
        error,
        'Unable to play the Step 2 ski animation'
      );
    });
  }

  private freezeVideoOnLastFrame(): void {
    const video = this.skiVideo?.nativeElement;

    if (!video || !Number.isFinite(video.duration)) {
      return;
    }

    const lastFrameTime = Math.max(
      0,
      video.duration - 0.04
    );

    video.currentTime = lastFrameTime;
    video.pause();
  }

  private cleanVideo(): void {
    const video = this.skiVideo?.nativeElement;

    if (!video) {
      return;
    }

    if (this.videoEndedHandler) {
      video.removeEventListener(
        'ended',
        this.videoEndedHandler
      );
    }

    video.pause();
    video.removeAttribute('src');
    video.load();
  }

  onLevelChange(level: string): void {
    try {
      this.selectedLevel = level;
      this.dataService.setSkiLevel(level);
    } catch (error) {
      this.errorHandler.handleServiceError(
        error,
        'Unable to save the selected ski level'
      );
    }
  }

  prev(): void {
    this.router
      .navigate(['/ski/step1'])
      .catch(error => {
        this.errorHandler.handleNavigationError(
          error,
          'Failed to navigate to Step 1'
        );
      });
  }

  next(): void {
    if (!this.selectedLevel) {
      this.errorHandler.addValidationError(
        'Please select a ski level to continue.'
      );

      return;
    }

    try {
      this.dataService.setSkiLevel(
        this.selectedLevel
      );

      this.router
        .navigate(['/ski/step3'])
        .catch(error => {
          this.errorHandler.handleNavigationError(
            error,
            'Failed to navigate to Step 3'
          );
        });
    } catch (error) {
      this.errorHandler.handleServiceError(
        error,
        'Step 2'
      );
    }
  }

}