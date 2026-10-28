import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';

type DrawnArea = { cx: number; cy: number; cw: number; ch: number };

/*
 * Zone réellement dessinée dans chaque vidéo (pixels non transparents,
 * cumulés sur toute l'animation), en fraction de la taille de la vidéo :
 *   cx, cy : décalage du centre du dessin par rapport au centre de la vidéo
 *   cw, ch : largeur et hauteur du dessin
 * Mesuré sur les fichiers de src/assets/images (à refaire si une vidéo change).
 */
const DRAWN_AREA: Record<string, DrawnArea> = {
  // step1 : position de repos du ski (fin de l'apparition / début du fondu).
  // Pendant les déplacements des curseurs, le ski est mesuré image par image.
  apparence1: { cx: 0, cy: 0.004, cw: 0.194, ch: 0.918 },
  anim1:      { cx: 0, cy: 0.004, cw: 0.194, ch: 0.918 },
  fade1:      { cx: 0, cy: 0.004, cw: 0.194, ch: 0.918 },
  apparence2: { cx: 0, cy: -0.001, cw: 0.194, ch: 0.92 },
  apparence3: { cx: 0.007, cy: -0.003, cw: 0.964, ch: 0.401 },
  apparence4: { cx: -0.001, cy: -0.001, cw: 0.999, ch: 0.999 },
  apparence5: { cx: -0.001, cy: -0.214, cw: 0.701, ch: 0.573 },
  apparence6: { cx: -0.001, cy: 0, cw: 0.499, ch: 0.462 },
  apparence7: { cx: -0.051, cy: -0.078, cw: 0.898, ch: 0.844 }
};

/** Part maximale de l'emplacement occupée par le dessin (mode "contain"). */
const FILL = 0.88;
const MAX_SCALE = 4;

/** Le mode "contain" ne s'applique qu'au responsive : le desktop garde ses réglages. */
const RESPONSIVE_QUERY = '(max-width: 1024px)';

/*
 * Desktop : le dessin est centré horizontalement entre le liseré gauche du
 * cadre du panneau et le bord gauche des cartes de réponse.
 * Position du liseré dans le canevas desktop de 1680 px
 * (BannerStup.png : x = 37 px sur 1920, + épaisseur du trait).
 */
const DESIGN_WIDTH = 1680;
const PANEL_FRAME_X = 34;

/** Résolution de la mesure image par image (bande verticale centrale). */
const PROBE_WIDTH = 32;
const PROBE_HEIGHT = 256;

/**
 * Cadre le dessin d'une vidéo dans son emplacement.
 * Publie --fit-x, --fit-y et --fit-scale, utilisées par les feuilles de style.
 *
 *   spsFitVideo           responsive : dessin centré, même remplissage sur toutes
 *                         les steps et tous les écrans ;
 *                         desktop : dessin centré entre le cadre du panneau et les cartes
 *   spsFitVideo="height"  le dessin occupe exactement la hauteur de l'emplacement,
 *                         sur tous les écrans ; les images atteintes par un seek
 *                         (curseurs de la step 1) sont mesurées une à une
 */
@Directive({
  selector: 'video[spsFitVideo]',
  standalone: false
})
export class FitVideoDirective implements OnInit, OnDestroy {

  @Input() spsFitVideo: '' | 'height' = '';

  private resizeObserver?: ResizeObserver;
  private mediaQuery?: MediaQueryList;
  private probe?: CanvasRenderingContext2D | null;

  /** Mesure de l'image affichée (mode "height"), remise à zéro à chaque changement de source. */
  private measuredArea: DrawnArea | null = null;

  private readonly update = () => this.applyFit();
  private readonly onSourceChange = () => { this.measuredArea = null; };
  private readonly onSeeked = () => {
    this.measuredArea = this.measureCurrentFrame();
    this.applyFit();
  };

  constructor(
    private elementRef: ElementRef<HTMLVideoElement>,
    private zone: NgZone
  ) {}

  private get heightMode(): boolean {
    return this.spsFitVideo === 'height';
  }

  ngOnInit(): void {
    if (typeof window === 'undefined' || typeof ResizeObserver === 'undefined') {
      return;
    }

    const video = this.elementRef.nativeElement;

    this.zone.runOutsideAngular(() => {
      this.mediaQuery = window.matchMedia(RESPONSIVE_QUERY);
      this.mediaQuery.addEventListener('change', this.update);

      video.addEventListener('loadstart', this.onSourceChange);
      video.addEventListener('loadedmetadata', this.update);

      if (this.heightMode) {
        video.addEventListener('seeked', this.onSeeked);
      }

      this.resizeObserver = new ResizeObserver(this.update);
      this.resizeObserver.observe(video);
    });
  }

  ngOnDestroy(): void {
    const video = this.elementRef.nativeElement;

    this.resizeObserver?.disconnect();
    this.mediaQuery?.removeEventListener('change', this.update);
    video.removeEventListener('loadstart', this.onSourceChange);
    video.removeEventListener('loadedmetadata', this.update);
    video.removeEventListener('seeked', this.onSeeked);
  }

  private applyFit(): void {
    const video = this.elementRef.nativeElement;
    const area = this.measuredArea ?? DRAWN_AREA[this.videoName(video)];
    const boxWidth = video.clientWidth;
    const boxHeight = video.clientHeight;
    const responsive = !!this.mediaQuery?.matches;

    if (!area || !video.videoWidth || !boxWidth || !boxHeight) {
      this.clear(video);
      return;
    }

    if (!responsive && !this.heightMode) {
      this.clear(video);
      this.centerOnDesktop(video, area);
      return;
    }

    video.style.removeProperty('translate');

    // Taille de l'image affichée (object-fit: contain)
    const ratio = video.videoWidth / video.videoHeight;
    const renderedWidth = Math.min(boxWidth, boxHeight * ratio);
    const renderedHeight = renderedWidth / ratio;

    const scale = this.heightMode
      ? boxHeight / (area.ch * renderedHeight)
      : Math.min(
          (FILL * boxWidth) / (area.cw * renderedWidth),
          (FILL * boxHeight) / (area.ch * renderedHeight),
          MAX_SCALE
        );

    video.style.setProperty('--fit-scale', scale.toFixed(4));
    video.style.setProperty('--fit-x', `${(-area.cx * renderedWidth * scale).toFixed(2)}px`);
    video.style.setProperty('--fit-y', `${(-area.cy * renderedHeight * scale).toFixed(2)}px`);
  }

  /**
   * Hauteur réelle du dessin sur l'image affichée : on lit l'opacité
   * d'une bande verticale centrale réduite (rapide, même pendant un glissé).
   */
  private measureCurrentFrame(): DrawnArea | null {
    const video = this.elementRef.nativeElement;
    const base = DRAWN_AREA[this.videoName(video)];

    if (!base || !video.videoWidth) {
      return null;
    }

    try {
      if (!this.probe) {
        const canvas = document.createElement('canvas');
        canvas.width = PROBE_WIDTH;
        canvas.height = PROBE_HEIGHT;
        this.probe = canvas.getContext('2d', { willReadFrequently: true });
      }

      const context = this.probe;

      if (!context) {
        return null;
      }

      const sourceWidth = video.videoWidth * base.cw * 1.4;
      const sourceX = video.videoWidth * (0.5 + base.cx) - sourceWidth / 2;

      context.clearRect(0, 0, PROBE_WIDTH, PROBE_HEIGHT);
      context.drawImage(video, sourceX, 0, sourceWidth, video.videoHeight, 0, 0, PROBE_WIDTH, PROBE_HEIGHT);

      const pixels = context.getImageData(0, 0, PROBE_WIDTH, PROBE_HEIGHT).data;
      let top = -1;
      let bottom = -1;

      for (let y = 0; y < PROBE_HEIGHT; y++) {
        for (let x = 0; x < PROBE_WIDTH; x++) {
          if (pixels[(y * PROBE_WIDTH + x) * 4 + 3] > 40) {
            if (top === -1) {
              top = y;
            }
            bottom = y;
            break;
          }
        }
      }

      if (top === -1) {
        return null;
      }

      const y0 = top / PROBE_HEIGHT;
      const y1 = (bottom + 1) / PROBE_HEIGHT;

      return { cx: base.cx, cw: base.cw, cy: (y0 + y1) / 2 - 0.5, ch: y1 - y0 };
    } catch {
      // Lecture des pixels impossible : on garde la mesure de référence
      return null;
    }
  }

  /**
   * Desktop : décale le dessin pour qu'il soit à égale distance du cadre
   * du panneau et des cartes. Seule la propriété `translate` est utilisée :
   * le zoom desktop de chaque step (transform) reste inchangé.
   */
  private centerOnDesktop(video: HTMLVideoElement, area: DrawnArea): void {
    const safeArea = video.closest('.layout-safe-area');
    const firstCard = video.closest('[class$="-content"]')?.querySelector('[class$="-options"] label');

    if (!safeArea || !firstCard) {
      return;
    }

    const safeRect = safeArea.getBoundingClientRect();
    const panelScale = safeRect.width / DESIGN_WIDTH;

    if (!panelScale) {
      return;
    }

    // Tout est converti dans le repère du canevas desktop (1680 px)
    const toCanvas = (screenX: number) => (screenX - safeRect.left) / panelScale;

    const frameX = PANEL_FRAME_X;
    const cardsX = toCanvas(firstCard.getBoundingClientRect().left);
    const target = (frameX + cardsX) / 2;

    // Centre de l'emplacement vidéo, sans le décalage déjà appliqué
    const currentShift = parseFloat(video.style.translate) || 0;
    const videoRect = video.getBoundingClientRect();
    const boxCenter = toCanvas(videoRect.left + videoRect.width / 2) - currentShift;

    // Décalage du dessin dans l'image, multiplié par le zoom desktop de la step
    const ratio = video.videoWidth / video.videoHeight;
    const renderedWidth = Math.min(video.clientWidth, video.clientHeight * ratio);
    const zoom = new DOMMatrix(getComputedStyle(video).transform).a || 1;
    const drawnCenter = boxCenter + area.cx * renderedWidth * zoom;

    video.style.translate = `${(target - drawnCenter).toFixed(1)}px 0`;
  }

  private clear(video: HTMLVideoElement): void {
    video.style.removeProperty('--fit-scale');
    video.style.removeProperty('--fit-x');
    video.style.removeProperty('--fit-y');
  }

  private videoName(video: HTMLVideoElement): string {
    const src = video.currentSrc || video.src || '';
    return src.split('/').pop()?.split('.')[0] ?? '';
  }
}
