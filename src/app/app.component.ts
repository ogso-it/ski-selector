import { Component, HostListener, OnDestroy } from '@angular/core';

const SOUND_STORAGE_KEY = 'sps-sound';
const MUSIC_VOLUME = 0.82;
const FADE_IN_MS = 1500;

/** Interactions qui autorisent le navigateur à lancer le son. */
const UNLOCK_EVENTS = ['pointerdown', 'keydown', 'touchstart'];

/*
 * Un mouvement de souris ne débloque pas le son pour le navigateur :
 * on tente quand même la lecture au premier mouvement, ce qui réussit
 * quand le site est déjà autorisé à jouer du son. Sinon, la musique
 * démarre au premier clic (UNLOCK_EVENTS).
 */
const MOVE_EVENT = 'pointermove';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnDestroy {

  title = 'smart-ogso-selector';

  /** Choix du visiteur : musique activée par défaut, sauf s'il l'a coupée. */
  soundEnabled = true;

  /** La musique joue réellement (le navigateur peut attendre une interaction). */
  isPlaying = false;

  private audio?: HTMLAudioElement;
  private fadeTimer?: ReturnType<typeof setInterval>;

  private readonly startOnInteraction = (event: Event) => {
    // Un clic sur le bouton son lui-même est géré par toggleSound()
    if ((event.target as Element | null)?.closest?.('.sps-sound')) {
      return;
    }

    this.play();
  };

  /** Une seule tentative au mouvement : si elle est refusée, on attend un clic. */
  private moveAttempted = false;

  private readonly startOnMove = () => {
    if (this.moveAttempted) {
      return;
    }

    this.moveAttempted = true;
    this.play();
  };

  constructor() {
    this.soundEnabled = this.readPreference() !== 'off';

    if (this.soundEnabled) {
      this.play();
    }
  }

  toggleSound(): void {
    if (this.soundEnabled) {
      this.soundEnabled = false;
      this.savePreference('off');
      this.removeUnlockListeners();
      this.stopFade();
      this.audio?.pause();
    } else {
      this.soundEnabled = true;
      this.savePreference('on');
      this.play();
    }
  }

  /** Coupe la musique quand l'onglet est masqué, la reprend au retour. */
  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (!this.audio || !this.soundEnabled) {
      return;
    }

    if (document.hidden) {
      this.audio.pause();
    } else {
      this.play();
    }
  }

  ngOnDestroy(): void {
    this.removeUnlockListeners();
    this.stopFade();

    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
  }

  /**
   * Lance la musique avec un fondu d'entrée. Les navigateurs refusent le son
   * avant toute interaction avec la page : dans ce cas, la lecture démarre
   * au premier clic, toucher ou appui sur une touche.
   */
  private play(): void {
    const audio = this.getAudio();

    if (!audio.paused) {
      return;
    }

    audio.volume = 0;

    audio.play()
      .then(() => {
        this.removeUnlockListeners();
        this.fadeIn(audio);
      })
      .catch(error => {
        if (error?.name === 'NotAllowedError') {
          this.addUnlockListeners();
        } else {
          console.error('Audio could not be played:', error);
        }
      });
  }

  private getAudio(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio('assets/audio/pick.mp3');
      this.audio.loop = true;
      this.audio.preload = 'auto';

      this.audio.addEventListener('playing', () => this.isPlaying = true);
      this.audio.addEventListener('pause', () => this.isPlaying = false);
    }

    return this.audio;
  }

  private fadeIn(audio: HTMLAudioElement): void {
    this.stopFade();

    const start = performance.now();

    this.fadeTimer = setInterval(() => {
      const progress = Math.min((performance.now() - start) / FADE_IN_MS, 1);
      audio.volume = MUSIC_VOLUME * progress;

      if (progress === 1) {
        this.stopFade();
      }
    }, 50);
  }

  private stopFade(): void {
    if (this.fadeTimer) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = undefined;
    }
  }

  private addUnlockListeners(): void {
    UNLOCK_EVENTS.forEach(name =>
      document.addEventListener(name, this.startOnInteraction, { once: true, passive: true })
    );

    document.addEventListener(MOVE_EVENT, this.startOnMove, { once: true, passive: true });
  }

  private removeUnlockListeners(): void {
    UNLOCK_EVENTS.forEach(name =>
      document.removeEventListener(name, this.startOnInteraction)
    );

    document.removeEventListener(MOVE_EVENT, this.startOnMove);
  }

  private readPreference(): string | null {
    try {
      return localStorage.getItem(SOUND_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  private savePreference(value: 'on' | 'off'): void {
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, value);
    } catch {
      // Stockage indisponible (navigation privée) : préférence non mémorisée
    }
  }

}
