import { Component, HostListener, OnDestroy } from '@angular/core';

const SOUND_STORAGE_KEY = 'sps-sound';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnDestroy {

  title = 'smart-ogso-selector';

  soundEnabled = false;

  /*
   * Le fichier audio (~9 Mo) n'est créé qu'au premier besoin,
   * pour ne pas ralentir le chargement initial de l'application.
   */
  private audio?: HTMLAudioElement;

  private readonly resumeOnInteraction = (event: Event) => {
    // Un clic sur le bouton son lui-même est géré par toggleSound()
    if ((event.target as Element | null)?.closest?.('.sps-sound')) {
      return;
    }

    this.play();
  };

  constructor() {
    // Les navigateurs bloquent l'autoplay : si l'utilisateur avait activé
    // le son, on le relance à sa première interaction avec la page.
    if (this.readPreference() === 'on') {
      ['pointerdown', 'keydown'].forEach(name =>
        document.addEventListener(name, this.resumeOnInteraction, { once: true })
      );
    }
  }

  toggleSound(): void {
    this.removeResumeListeners();

    if (this.soundEnabled) {
      this.audio?.pause();
      this.soundEnabled = false;
      this.savePreference('off');
    } else {
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
      this.audio.play().catch(() => {});
    }
  }

  ngOnDestroy(): void {
    this.removeResumeListeners();

    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
  }

  private play(): void {
    this.removeResumeListeners();

    this.getAudio().play()
      .then(() => {
        this.soundEnabled = true;
        this.savePreference('on');
      })
      .catch(error => {
        console.error('Audio could not be played:', error);
        this.soundEnabled = false;
      });
  }

  private getAudio(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio('assets/audio/pick.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.82;
    }

    return this.audio;
  }

  private removeResumeListeners(): void {
    ['pointerdown', 'keydown'].forEach(name =>
      document.removeEventListener(name, this.resumeOnInteraction)
    );
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
