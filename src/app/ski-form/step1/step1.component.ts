import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { Router } from '@angular/router';

import { DataServiceService } from 'src/app/data-service.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

type ActiveSlider = 'height' | 'weight' | null;

type VideoState =
  | 'appearance'
  | 'main'
  | 'fade';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
  standalone: false
})
export class Step1Component
  implements OnInit, AfterViewInit, OnDestroy {

  /* =====================================================
     TEMPLATE REFERENCES
  ===================================================== */

  @ViewChild('heightSlider')
  private heightSliderRef?: ElementRef<HTMLElement>;

  @ViewChild('weightSlider')
  private weightSliderRef?: ElementRef<HTMLElement>;

  @ViewChild('skiVideo')
  private skiVideoRef?: ElementRef<HTMLVideoElement>;


  /* =====================================================
     USER VALUES
  ===================================================== */

  height = 178;
  weight = 75;

  readonly HEIGHT_MIN = 140;
  readonly HEIGHT_MAX = 220;

  readonly WEIGHT_MIN = 40;
  readonly WEIGHT_MAX = 150;


  /* =====================================================
     VIDEO SOURCES
  ===================================================== */

  private readonly appearanceVideoSource =
    'assets/images/apparence1.webm';

  private readonly mainVideoSource =
    'assets/images/anim1.webm';

  private readonly fadeVideoSource =
    'assets/images/fade1.webm';


  /* =====================================================
     SLIDER STATE
  ===================================================== */

  private activeSlider: ActiveSlider = null;

  private activePointerId: number | null = null;


  /* =====================================================
     VIDEO STATE
  ===================================================== */

  private videoState: VideoState = 'appearance';

  private videoInitialized = false;

  private mainVideoReady = false;

  private isNavigating = false;

  private fadeFallbackTimer: ReturnType<typeof setTimeout> | null = null;


  /* =====================================================
     CONSTRUCTOR
  ===================================================== */

  constructor(
    private dataService: DataServiceService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}


  /* =====================================================
     ANGULAR LIFECYCLE
  ===================================================== */

  ngOnInit(): void {
    const profile = this.dataService.profile;

    if (
      typeof profile.height === 'number' &&
      profile.height >= this.HEIGHT_MIN &&
      profile.height <= this.HEIGHT_MAX
    ) {
      this.height = profile.height;
    }

    if (
      typeof profile.weight === 'number' &&
      profile.weight >= this.WEIGHT_MIN &&
      profile.weight <= this.WEIGHT_MAX
    ) {
      this.weight = profile.weight;
    }
  }


  ngAfterViewInit(): void {
    this.initializeVideo();
  }


  ngOnDestroy(): void {
    this.stopDrag();

    this.clearFadeFallbackTimer();

    const video = this.skiVideoRef?.nativeElement;

    if (video) {
      video.pause();

      video.onended = null;
      video.onloadedmetadata = null;
      video.oncanplay = null;
      video.onerror = null;

      video.removeAttribute('src');
      video.load();
    }
  }


  /* =====================================================
     PERCENTAGES
  ===================================================== */

  get heightPercent(): number {
    return this.valueToPercent(
      this.height,
      this.HEIGHT_MIN,
      this.HEIGHT_MAX
    );
  }


  get weightPercent(): number {
    return this.valueToPercent(
      this.weight,
      this.WEIGHT_MIN,
      this.WEIGHT_MAX
    );
  }


  /* =====================================================
     VIDEO INITIALIZATION
  ===================================================== */

  private initializeVideo(): void {
    const video = this.skiVideoRef?.nativeElement;

    if (!video || this.videoInitialized) {
      return;
    }

    this.videoInitialized = true;

    video.muted = true;
    video.playsInline = true;
    video.controls = false;

    this.playAppearanceVideo();
  }


  /* =====================================================
     APPEARANCE VIDEO
  ===================================================== */

  private playAppearanceVideo(): void {
    const video = this.skiVideoRef?.nativeElement;

    if (!video) {
      return;
    }

    this.videoState = 'appearance';
    this.mainVideoReady = false;

    this.resetVideoEvents(video);

    video.loop = false;
    video.playbackRate = 1;
    video.src = this.appearanceVideoSource;

    video.onended = () => {
      this.loadMainVideo();
    };

    video.onerror = () => {
      /*
       * Si la vidéo d'apparition ne charge pas,
       * on affiche directement la vidéo principale.
       */
      this.loadMainVideo();
    };

    video.load();

    video.play().catch(() => {
      /*
       * Certains navigateurs peuvent bloquer autoplay.
       * Comme la vidéo est muted, elle devrait normalement jouer.
       * En cas de blocage, on passe directement à anim1.
       */
      this.loadMainVideo();
    });
  }


  /* =====================================================
     MAIN VIDEO
  ===================================================== */

  private loadMainVideo(): void {
    const video = this.skiVideoRef?.nativeElement;

    if (!video || this.isNavigating) {
      return;
    }

    this.videoState = 'main';
    this.mainVideoReady = false;

    this.resetVideoEvents(video);

    video.pause();
    video.loop = false;
    video.playbackRate = 1;
    video.src = this.mainVideoSource;

    video.onloadedmetadata = () => {
      this.mainVideoReady = true;

      this.updateMainVideoFrame();
    };

    video.oncanplay = () => {
      if (!this.mainVideoReady) {
        this.mainVideoReady = true;
      }

      this.updateMainVideoFrame();
    };

    video.onerror = error => {
      this.errorHandler.handleServiceError(
        error,
        'Unable to load the Step 1 ski animation'
      );
    };

    video.load();
  }


  /* =====================================================
     VIDEO FRAME CONTROL
  ===================================================== */

  private updateMainVideoFrame(): void {
    const video = this.skiVideoRef?.nativeElement;

    if (
      !video ||
      this.videoState !== 'main' ||
      !this.mainVideoReady ||
      !Number.isFinite(video.duration) ||
      video.duration <= 0
    ) {
      return;
    }

    /*
     * La taille influence principalement la longueur du ski.
     * Le poids apporte une influence secondaire sur le flex.
     *
     * 75 % : hauteur
     * 25 % : poids
     */

    const heightProgress =
      (this.height - this.HEIGHT_MIN) /
      (this.HEIGHT_MAX - this.HEIGHT_MIN);

    const weightProgress =
      (this.weight - this.WEIGHT_MIN) /
      (this.WEIGHT_MAX - this.WEIGHT_MIN);

    const combinedProgress =
      heightProgress * 0.75 +
      weightProgress * 0.25;

    const clampedProgress = Math.min(
      Math.max(combinedProgress, 0),
      1
    );

    /*
     * On évite la toute dernière frame,
     * car certains navigateurs remettent la vidéo au début
     * lorsqu'on cherche exactement la fin.
     */

    const safeDuration = Math.max(
      video.duration - 0.04,
      0
    );

    const targetTime =
      clampedProgress * safeDuration;

    video.pause();

    try {
      video.currentTime = targetTime;
    } catch {
      /*
       * currentTime peut échouer brièvement
       * si les métadonnées ne sont pas encore prêtes.
       */
    }
  }


  /* =====================================================
     FADE VIDEO
  ===================================================== */

  private playFadeAndNavigate(): void {
    const video = this.skiVideoRef?.nativeElement;

    if (!video) {
      this.navigateToStep2();

      return;
    }

    this.videoState = 'fade';

    this.resetVideoEvents(video);

    video.pause();
    video.loop = false;
    video.playbackRate = 1;
    video.src = this.fadeVideoSource;

    video.onended = () => {
      this.navigateToStep2();
    };

    video.onerror = () => {
      this.navigateToStep2();
    };

    video.load();

    video.play().catch(() => {
      this.navigateToStep2();
    });

    /*
     * Sécurité : si l'événement "ended" ne se déclenche pas,
     * la navigation se fera quand même.
     */

    this.clearFadeFallbackTimer();

    this.fadeFallbackTimer = setTimeout(() => {
      this.navigateToStep2();
    }, 4000);
  }


  private resetVideoEvents(
    video: HTMLVideoElement
  ): void {
    video.onended = null;
    video.onloadedmetadata = null;
    video.oncanplay = null;
    video.onerror = null;
  }


  private clearFadeFallbackTimer(): void {
    if (this.fadeFallbackTimer !== null) {
      clearTimeout(this.fadeFallbackTimer);

      this.fadeFallbackTimer = null;
    }
  }


  /* =====================================================
     HEIGHT SLIDER
  ===================================================== */

  startHeightDrag(event: PointerEvent): void {
    this.startDrag(
      event,
      'height',
      this.heightSliderRef
    );
  }


  /* =====================================================
     WEIGHT SLIDER
  ===================================================== */

  startWeightDrag(event: PointerEvent): void {
    this.startDrag(
      event,
      'weight',
      this.weightSliderRef
    );
  }


  /* =====================================================
     START DRAG
  ===================================================== */

  private startDrag(
    event: PointerEvent,
    slider: Exclude<ActiveSlider, null>,
    elementRef?: ElementRef<HTMLElement>
  ): void {
    const element = elementRef?.nativeElement;

    if (!element || this.isNavigating) {
      return;
    }

    event.preventDefault();

    this.activeSlider = slider;
    this.activePointerId = event.pointerId;

    try {
      element.setPointerCapture(event.pointerId);
    } catch {
      /*
       * Certains anciens navigateurs ne prennent pas
       * correctement en charge setPointerCapture.
       */
    }

    this.updateSliderFromPointer(event.clientY);
  }


  /* =====================================================
     POINTER MOVE
  ===================================================== */

  @HostListener(
    'document:pointermove',
    ['$event']
  )
  onPointerMove(event: PointerEvent): void {
    if (
      !this.activeSlider ||
      this.activePointerId !== event.pointerId ||
      this.isNavigating
    ) {
      return;
    }

    event.preventDefault();

    this.updateSliderFromPointer(event.clientY);
  }


  /* =====================================================
     POINTER UP
  ===================================================== */

  @HostListener(
    'document:pointerup',
    ['$event']
  )
  onPointerUp(event: PointerEvent): void {
    if (this.activePointerId !== event.pointerId) {
      return;
    }

    this.stopDrag();
  }


  /* =====================================================
     POINTER CANCEL
  ===================================================== */

  @HostListener(
    'document:pointercancel',
    ['$event']
  )
  onPointerCancel(event: PointerEvent): void {
    if (this.activePointerId !== event.pointerId) {
      return;
    }

    this.stopDrag();
  }


  private stopDrag(): void {
    this.activeSlider = null;
    this.activePointerId = null;
  }


  /* =====================================================
     UPDATE SLIDER FROM POINTER
  ===================================================== */

  private updateSliderFromPointer(
    clientY: number
  ): void {
    if (this.activeSlider === 'height') {
      const element =
        this.heightSliderRef?.nativeElement;

      if (!element) {
        return;
      }

      const newHeight = this.pointerToValue(
        clientY,
        element,
        this.HEIGHT_MIN,
        this.HEIGHT_MAX
      );

      if (newHeight !== this.height) {
        this.height = newHeight;

        this.updateMainVideoFrame();
      }

      return;
    }

    if (this.activeSlider === 'weight') {
      const element =
        this.weightSliderRef?.nativeElement;

      if (!element) {
        return;
      }

      const newWeight = this.pointerToValue(
        clientY,
        element,
        this.WEIGHT_MIN,
        this.WEIGHT_MAX
      );

      if (newWeight !== this.weight) {
        this.weight = newWeight;

        this.updateMainVideoFrame();
      }
    }
  }


  /* =====================================================
     POINTER POSITION TO VALUE
  ===================================================== */

  private pointerToValue(
    clientY: number,
    element: HTMLElement,
    min: number,
    max: number
  ): number {
    const rect =
      element.getBoundingClientRect();

    if (rect.height <= 0) {
      return min;
    }

    const relativeY =
      clientY - rect.top;

    const clampedY = Math.min(
      Math.max(relativeY, 0),
      rect.height
    );

    /*
     * En haut = valeur maximale
     * En bas = valeur minimale
     */

    const percent =
      1 - clampedY / rect.height;

    const value =
      min + percent * (max - min);

    return Math.round(value);
  }


  /* =====================================================
     VALUE TO PERCENT
  ===================================================== */

  private valueToPercent(
    value: number,
    min: number,
    max: number
  ): number {
    const rawPercent =
      ((value - min) / (max - min)) * 100;

    return Math.min(
      Math.max(rawPercent, 0),
      100
    );
  }


  /* =====================================================
     HEIGHT KEYBOARD
  ===================================================== */

  onHeightKeydown(
    event: KeyboardEvent
  ): void {
    if (this.isNavigating) {
      return;
    }

    const newValue =
      this.getKeyboardValue(
        event,
        this.height,
        this.HEIGHT_MIN,
        this.HEIGHT_MAX
      );

    if (newValue === null) {
      return;
    }

    event.preventDefault();

    this.height = newValue;

    this.updateMainVideoFrame();
  }


  /* =====================================================
     WEIGHT KEYBOARD
  ===================================================== */

  onWeightKeydown(
    event: KeyboardEvent
  ): void {
    if (this.isNavigating) {
      return;
    }

    const newValue =
      this.getKeyboardValue(
        event,
        this.weight,
        this.WEIGHT_MIN,
        this.WEIGHT_MAX
      );

    if (newValue === null) {
      return;
    }

    event.preventDefault();

    this.weight = newValue;

    this.updateMainVideoFrame();
  }


  /* =====================================================
     KEYBOARD VALUE
  ===================================================== */

  private getKeyboardValue(
    event: KeyboardEvent,
    currentValue: number,
    min: number,
    max: number
  ): number | null {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        return Math.min(
          currentValue + 1,
          max
        );

      case 'ArrowDown':
      case 'ArrowLeft':
        return Math.max(
          currentValue - 1,
          min
        );

      case 'PageUp':
        return Math.min(
          currentValue + 5,
          max
        );

      case 'PageDown':
        return Math.max(
          currentValue - 5,
          min
        );

      case 'Home':
        return min;

      case 'End':
        return max;

      default:
        return null;
    }
  }


  /* =====================================================
     VALIDATION
  ===================================================== */

  private isValid(): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (
      this.height < this.HEIGHT_MIN ||
      this.height > this.HEIGHT_MAX
    ) {
      errors.push(
        `Height must be between ${this.HEIGHT_MIN} cm and ${this.HEIGHT_MAX} cm`
      );
    }

    if (
      this.weight < this.WEIGHT_MIN ||
      this.weight > this.WEIGHT_MAX
    ) {
      errors.push(
        `Weight must be between ${this.WEIGHT_MIN} kg and ${this.WEIGHT_MAX} kg`
      );
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }


  /* =====================================================
     NEXT
  ===================================================== */

  next(): void {
    if (this.isNavigating) {
      return;
    }

    try {
      const validation =
        this.isValid();

      if (!validation.valid) {
        validation.errors.forEach(error => {
          this.errorHandler.addValidationError(
            error
          );
        });

        return;
      }

      this.dataService.setHeight(
        this.height
      );

      this.dataService.setWeight(
        this.weight
      );

      this.isNavigating = true;

      this.stopDrag();

      this.playFadeAndNavigate();

    } catch (error) {
      this.isNavigating = false;

      this.errorHandler.handleServiceError(
        error,
        'Step1'
      );
    }
  }


  /* =====================================================
     NAVIGATION
  ===================================================== */

  private navigateToStep2(): void {
    if (!this.isNavigating) {
      return;
    }

    this.clearFadeFallbackTimer();

    this.router
      .navigate(['/ski/step2'])
      .catch(error => {
        this.isNavigating = false;

        this.errorHandler.handleNavigationError(
          error,
          'Failed to navigate to step 2'
        );
      });
  }
}