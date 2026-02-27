import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-ski-layout',
  templateUrl: './ski-layout.html',
  styleUrls: ['./ski-layout.scss'],
  standalone: false
})
export class SkiLayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoBg') videoElement!: ElementRef<HTMLVideoElement>;
  
  currentStep: number = 1;
  private visibilitySubscription!: Subscription;
  private checkInterval: any;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateCurrentStep(event.url);
    });
  }

  ngAfterViewInit() {
    // Initialiser la vidéo après que la vue soit prête
    setTimeout(() => {
      this.initVideo();
    }, 100);
  }

  ngOnDestroy() {
    // Nettoyer les abonnements
    if (this.visibilitySubscription) {
      this.visibilitySubscription.unsubscribe();
    }
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  private initVideo() {
    const video = this.videoElement?.nativeElement;
    if (!video) return;

    // Configuration de la vidéo
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';

    // Première tentative de lecture
    this.attemptPlay(video);

    // Surveiller les changements de visibilité de la page
    this.visibilitySubscription = fromEvent(document, 'visibilitychange').subscribe(() => {
      if (document.visibilityState === 'visible') {
        this.attemptPlay(video);
      }
    });

    // Vérifier périodiquement que la vidéo joue
    this.checkInterval = setInterval(() => {
      this.attemptPlay(video);
    }, 2000);

    // Réessayer quand l'utilisateur interagit avec la page
    const interactionEvents = ['click', 'touchstart', 'scroll', 'keydown'];
    interactionEvents.forEach(event => {
      document.addEventListener(event, () => {
        this.attemptPlay(video);
      }, { once: true });
    });

    // Gérer les erreurs de lecture
    video.addEventListener('error', () => {
      console.log('Erreur vidéo, tentative de rechargement');
      setTimeout(() => this.attemptPlay(video), 1000);
    });

    // Si la vidéo est mise en pause, la relancer
    video.addEventListener('pause', () => {
      setTimeout(() => this.attemptPlay(video), 100);
    });
  }

  private attemptPlay(video: HTMLVideoElement) {
    if (!video) return;
    
    if (video.paused) {
      video.play().catch(error => {
        // Ignorer silencieusement - on réessaiera plus tard
        // C'est normal que ça échoue si l'utilisateur n'a pas encore interagi
      });
    }
  }

  updateCurrentStep(url: string) {
    if (url.includes('/step1')) this.currentStep = 1;
    else if (url.includes('/step2')) this.currentStep = 2;
    else if (url.includes('/step3')) this.currentStep = 3;
    else if (url.includes('/step4')) this.currentStep = 4;
    else if (url.includes('/step5')) this.currentStep = 5;
    else if (url.includes('/step6')) this.currentStep = 6;
    else if (url.includes('/step7')) this.currentStep = 7;
    else this.currentStep = 1; // Par défaut
  }
}