import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-ski-layout',
  templateUrl: './ski-layout.html',
  styleUrls: ['./ski-layout.scss'],
  standalone: false
})
export class SkiLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  currentStep: number = 1;
  private routerSubscription!: Subscription;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Initialiser la souscription aux événements de navigation uniquement dans le navigateur
    if (this.isBrowser) {
      this.routerSubscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.updateCurrentStepFromUrl(event.urlAfterRedirects);
      });
    }
  }

  ngOnInit(): void {
    // Mettre à jour l'étape courante au chargement initial
    if (this.isBrowser) {
      this.updateCurrentStepFromUrl(this.router.url);
    }
  }

  ngAfterViewInit(): void {
    // Initialiser la vidéo après le chargement de la vue
    if (this.isBrowser) {
      this.initVideo();
    }
  }

  ngOnDestroy(): void {
    // Nettoyer la souscription pour éviter les fuites mémoire
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  /**
   * Met à jour l'étape courante en fonction de l'URL
   * @param url L'URL à analyser
   */
  private updateCurrentStepFromUrl(url: string): void {
    // Nettoyer l'URL (enlever les query params et ancres)
    const cleanUrl = url.split('?')[0].split('#')[0];
    
    // Pattern pour trouver le numéro de l'étape
    const stepPattern = /\/step(\d+)/;
    const match = cleanUrl.match(stepPattern);
    
    if (match && match[1]) {
      const stepNumber = parseInt(match[1], 10);
      // Valider que c'est entre 1 et 7
      if (stepNumber >= 1 && stepNumber <= 7) {
        this.currentStep = stepNumber;
      } else {
        this.currentStep = 1;
      }
    } else {
      // Pas de step dans l'URL (page d'accueil ou autre)
      this.currentStep = 1;
    }
    
    // Pour le debug (peut être retiré en production)
    console.log('Current step:', this.currentStep, 'for URL:', url);
  }

  /**
   * Initialise la vidéo background
   */
  private initVideo(): void {
    // S'assurer qu'on est dans le navigateur
    if (!this.isBrowser) return;

    const video = document.querySelector('.layout-bg-video') as HTMLVideoElement;
    if (!video) {
      console.warn('Video element not found');
      return;
    }

    // Configuration pour mobile et desktop
    video.muted = true;
    video.playsInline = true;
    video.disableRemotePlayback = true;
    
    // Attributs supplémentaires pour plus de compatibilité
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('disableRemotePlayback', '');
    video.setAttribute('preload', 'auto');
    
    // Tenter de jouer la vidéo
    this.attemptPlayVideo(video);
  }

  /**
   * Tente de jouer la vidéo avec gestion d'erreur
   * @param video L'élément vidéo
   */
  private attemptPlayVideo(video: HTMLVideoElement): void {
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Video playing successfully');
        })
        .catch(error => {
          console.log('Video autoplay failed:', error);
          this.showFallbackImage();
          this.setupUserInteractionListener(video);
        });
    }
  }

  /**
   * Configure un listener pour jouer la vidéo après interaction utilisateur
   * @param video L'élément vidéo
   */
  private setupUserInteractionListener(video: HTMLVideoElement): void {
    const playVideoOnInteraction = () => {
      video.play()
        .then(() => {
          console.log('Video started after user interaction');
          this.hideFallbackImage();
        })
        .catch(e => {
          console.log('Still failed to play video:', e);
          this.showFallbackImage();
        });
      
      // Retirer les listeners après la première interaction
      document.removeEventListener('touchstart', playVideoOnInteraction);
      document.removeEventListener('click', playVideoOnInteraction);
      document.removeEventListener('scroll', playVideoOnInteraction);
      document.removeEventListener('keydown', playVideoOnInteraction);
    };

    // Essayer avec différents événements pour plus de chances
    document.addEventListener('touchstart', playVideoOnInteraction, { once: true });
    document.addEventListener('click', playVideoOnInteraction, { once: true });
    document.addEventListener('scroll', playVideoOnInteraction, { once: true });
    document.addEventListener('keydown', playVideoOnInteraction, { once: true });
  }

  /**
   * Affiche l'image de fallback
   */
  private showFallbackImage(): void {
    const video = document.querySelector('.layout-bg-video') as HTMLVideoElement;
    const fallback = document.querySelector('.layout-bg-fallback') as HTMLElement;
    
    if (video) {
      video.style.display = 'none';
    }
    
    if (fallback) {
      fallback.style.display = 'block';
      fallback.style.backgroundImage = 'url(assets/images/BACKGROUND-fallback.webp)';
      fallback.style.backgroundSize = 'cover';
      fallback.style.backgroundPosition = 'center';
      fallback.style.backgroundRepeat = 'no-repeat';
    }
  }

  /**
   * Cache l'image de fallback
   */
  private hideFallbackImage(): void {
    const video = document.querySelector('.layout-bg-video') as HTMLVideoElement;
    const fallback = document.querySelector('.layout-bg-fallback') as HTMLElement;
    
    if (video) {
      video.style.display = 'block';
    }
    
    if (fallback) {
      fallback.style.display = 'none';
    }
  }

  /**
   * Navigue vers une étape spécifique
   * @param step Numéro de l'étape (1-7)
   */
  goToStep(step: number): void {
    if (step >= 1 && step <= 7) {
      this.router.navigate([`/ski/step${step}`]);
    }
  }

  /**
   * Vérifie si une étape est active
   * @param step Numéro de l'étape à vérifier
   * @returns true si l'étape est active
   */
  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }

  /**
   * Obtient le numéro de l'étape suivante
   * @returns Le numéro de l'étape suivante ou null si c'est la dernière
   */
  getNextStep(): number | null {
    if (this.currentStep < 7) {
      return this.currentStep + 1;
    }
    return null;
  }

  /**
   * Obtient le numéro de l'étape précédente
   * @returns Le numéro de l'étape précédente ou null si c'est la première
   */
  getPreviousStep(): number | null {
    if (this.currentStep > 1) {
      return this.currentStep - 1;
    }
    return null;
  }

  /**
   * Navigue vers l'étape suivante
   */
  goToNextStep(): void {
    const nextStep = this.getNextStep();
    if (nextStep) {
      this.goToStep(nextStep);
    }
  }

  /**
   * Navigue vers l'étape précédente
   */
  goToPreviousStep(): void {
    const previousStep = this.getPreviousStep();
    if (previousStep) {
      this.goToStep(previousStep);
    }
  }
}