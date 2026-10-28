import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

/*
 * Largeur de référence du design desktop.
 * Toutes les steps sont dessinées pour un panneau de 1680 × 945 px.
 */
const DESIGN_WIDTH = 1680;

@Component({
  selector: 'app-ski-layout',
  templateUrl: './ski-layout.html',
  styleUrls: ['./ski-layout.scss'],
  standalone: false
})
export class SkiLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('panel')
  private panelRef?: ElementRef<HTMLElement>;

  @ViewChild('bgVideo')
  private bgVideoRef?: ElementRef<HTMLVideoElement>;

  readonly steps = [1, 2, 3, 4, 5, 6, 7];

  currentStep = 1;

  /** Page d'accueil : le questionnaire n'a pas encore commencé. */
  isHome = true;

  private routerSubscription?: Subscription;
  private resizeObserver?: ResizeObserver;
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
    private zone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get progressPercent(): number {
    return ((this.currentStep - 1) / (this.steps.length - 1)) * 100;
  }

  ngOnInit(): void {
    this.updateCurrentStepFromUrl(this.router.url);

    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.updateCurrentStepFromUrl(event.urlAfterRedirects));
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.observePanelSize();
    this.initVideo();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.resizeObserver?.disconnect();
  }

  goToStep(step: number): void {
    // On ne peut revenir que sur une étape déjà complétée
    if (step >= 1 && step < this.currentStep) {
      this.router.navigate([`/ski/step${step}`]);
    }
  }

  /**
   * Met à jour l'étape courante en fonction de l'URL
   */
  private updateCurrentStepFromUrl(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];
    const match = cleanUrl.match(/\/step(\d+)/);
    const stepNumber = match ? parseInt(match[1], 10) : 1;

    this.currentStep = stepNumber >= 1 && stepNumber <= 7 ? stepNumber : 1;
    this.isHome = !match;
  }

  /**
   * Le contenu desktop est dessiné à taille fixe (1680 px) puis mis à
   * l'échelle pour remplir le panneau, quelle que soit la taille d'écran.
   */
  private observePanelSize(): void {
    const panel = this.panelRef?.nativeElement;

    if (!panel || typeof ResizeObserver === 'undefined') {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(entries => {
        const width = entries[0]?.contentRect.width ?? DESIGN_WIDTH;
        panel.style.setProperty('--panel-scale', String(width / DESIGN_WIDTH));
      });

      this.resizeObserver.observe(panel);
    });
  }

  /**
   * Initialise la vidéo background.
   * Si l'autoplay est bloqué, l'image "poster" reste visible
   * et la lecture est relancée à la première interaction.
   */
  private initVideo(): void {
    const video = this.bgVideoRef?.nativeElement;

    if (!video) {
      return;
    }

    video.muted = true;
    video.playsInline = true;
    video.disableRemotePlayback = true;

    video.play().catch(() => {
      const retry = () => {
        video.play().catch(() => {});
        events.forEach(name => document.removeEventListener(name, retry));
      };
      const events = ['touchstart', 'click', 'keydown'];

      events.forEach(name =>
        document.addEventListener(name, retry, { once: true, passive: true })
      );
    });
  }
}
