import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ski-layout',
  templateUrl: './ski-layout.html',
  styleUrls: ['./ski-layout.scss'],
  standalone: false
})
export class SkiLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  currentStep: number = 1;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Récupérer l'étape courante depuis l'URL ou un service
    this.updateCurrentStep();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initVideo();
    }
  }

  private initVideo(): void {
    try {
      const video = document.querySelector('.layout-bg-video') as HTMLVideoElement;
      if (!video) return;

      // Configuration pour mobile
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');
      video.setAttribute('disableRemotePlayback', '');
      
      // Important pour iOS
      video.muted = true;
      
      // Tenter de jouer la vidéo
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Video playing successfully');
        }).catch(error => {
          console.log('Video autoplay failed:', error);
          this.showFallbackImage();
          
          // Tentative de lecture après interaction utilisateur
          this.setupUserInteractionListener(video);
        });
      }
    } catch (e) {
      console.error('Video initialization error:', e);
      this.showFallbackImage();
    }
  }

  private setupUserInteractionListener(video: HTMLVideoElement): void {
    const playVideoOnInteraction = () => {
      video.play().then(() => {
        console.log('Video started after user interaction');
      }).catch(e => {
        console.log('Still failed to play video:', e);
        this.showFallbackImage();
      });
      
      // Retirer les listeners après la première interaction
      document.removeEventListener('touchstart', playVideoOnInteraction);
      document.removeEventListener('click', playVideoOnInteraction);
    };

    document.addEventListener('touchstart', playVideoOnInteraction, { once: true });
    document.addEventListener('click', playVideoOnInteraction, { once: true });
  }

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
      fallback.style.position = 'absolute';
      fallback.style.top = '0';
      fallback.style.left = '0';
      fallback.style.width = '100%';
      fallback.style.height = '100%';
      fallback.style.zIndex = '1';
    }
  }

  private updateCurrentStep(): void {
    // Logique pour déterminer l'étape courante
    // À implémenter selon ton routage
    const path = window.location.pathname;
    if (path.includes('/ski/step1')) this.currentStep = 1;
    else if (path.includes('/ski/step2')) this.currentStep = 2;
    else if (path.includes('/ski/step3')) this.currentStep = 3;
    else if (path.includes('/ski/step4')) this.currentStep = 4;
    else if (path.includes('/ski/step5')) this.currentStep = 5;
    else if (path.includes('/ski/step6')) this.currentStep = 6;
    else if (path.includes('/ski/step7')) this.currentStep = 7;
    else this.currentStep = 1;
  }
}