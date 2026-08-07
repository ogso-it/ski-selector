import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

import { Router } from '@angular/router';

import { DataServiceService } from 'src/app/data-service.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
  standalone: false
})
export class Step3Component
implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('terrainVideo')
  terrainVideo!: ElementRef<HTMLVideoElement>;

  selectedTechnique = '';

  private readonly appearanceVideoSource =
    'assets/images/apparence3.webm';

  private isDestroyed = false;

  private videoEndedHandler?: () => void;

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {

    this.restoreSelection();

  }

  ngAfterViewInit(): void {

    this.initializeVideo();

  }

  ngOnDestroy(): void {

    this.isDestroyed = true;

    this.cleanVideo();

  }

  /*==================================================
  RESTORE SAVED VALUE
  ==================================================*/

  private restoreSelection(): void {

    try {

      const profile = this.dataService.profile;

      if (profile?.terrainType) {

        this.selectedTechnique = profile.terrainType;

      }

    } catch (error) {

      this.errorHandler.handleServiceError(
        error,
        'Unable to restore terrain selection'
      );

    }

  }

  /*==================================================
  VIDEO
  ==================================================*/

  private initializeVideo(): void {

    const video = this.terrainVideo?.nativeElement;

    if (!video) {

      return;

    }

    video.src = this.appearanceVideoSource;

    video.preload = 'auto';

    video.loop = false;

    video.muted = true;

    video.playsInline = true;

    video.load();

    this.videoEndedHandler = () => {

      if (this.isDestroyed) {

        return;

      }

      this.freezeLastFrame();

    };

    video.addEventListener(
      'ended',
      this.videoEndedHandler
    );

    video.play().catch(error => {

      this.errorHandler.handleServiceError(
        error,
        'Unable to load Step 3 animation'
      );

    });

  }

  private freezeLastFrame(): void {

    const video = this.terrainVideo.nativeElement;

    if (!video.duration) {

      return;

    }

    video.currentTime = Math.max(
      0,
      video.duration - 0.04
    );

    video.pause();

  }

  private cleanVideo(): void {

    const video = this.terrainVideo?.nativeElement;

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

  /*==================================================
  RADIO
  ==================================================*/

  onTechniqueChange(
    terrain: string
  ): void {

    this.selectedTechnique = terrain;

    this.dataService.setTerrainType(
      terrain
    );

  }

  /*==================================================
  NAVIGATION
  ==================================================*/

  prev(): void {

    this.router.navigate(
      ['/ski/step2']
    ).catch(error => {

      this.errorHandler.handleNavigationError(
        error,
        'Unable to navigate to Step 2'
      );

    });

  }

  next(): void {

    if (!this.selectedTechnique) {

      this.errorHandler.addValidationError(
        'Please select a terrain.'
      );

      return;

    }

    this.dataService.setTerrainType(
      this.selectedTechnique
    );

    this.router.navigate(
      ['/ski/step4']
    ).catch(error => {

      this.errorHandler.handleNavigationError(
        error,
        'Unable to navigate to Step 4'
      );

    });

  }

}