import { Injectable } from '@angular/core';
import type { jsPDF } from 'jspdf';

/*==========================================================
DONNÉES D'ENTRÉE
==========================================================*/

export interface PdfProfileItem {
  label: string;
  value: string;
}

export interface PdfSki {
  name: string;
  family?: string;
  category?: string;
  size: number;
  sidecut?: string;
  score?: number;
  src?: string;
  link?: string;
}

export interface SkiPdfData {
  profile: PdfProfileItem[];
  skis: PdfSki[];
}

/*==========================================================
CHARTE (identique à l'application)
==========================================================*/

type Rgb = [number, number, number];

const COLOR = {
  page:      [14, 14, 17] as Rgb,
  header:    [8, 8, 10] as Rgb,
  card:      [27, 27, 32] as Rgb,
  cardLine:  [52, 52, 60] as Rgb,
  orange:    [255, 91, 39] as Rgb,
  cyan:      [0, 234, 255] as Rgb,
  white:     [255, 255, 255] as Rgb,
  text:      [214, 214, 220] as Rgb,
  muted:     [138, 138, 150] as Rgb,
  track:     [48, 48, 56] as Rgb
};

const RANK_COLORS: Rgb[] = [
  [255, 215, 0],
  [192, 192, 192],
  [205, 127, 50]
];

/** Couleurs de score, mêmes seuils que la page résultats. */
function scoreColor(score: number): Rgb {
  if (score >= 90) { return [16, 185, 129]; }
  if (score >= 70) { return [59, 130, 246]; }
  if (score >= 50) { return [245, 158, 11]; }
  return [239, 68, 68];
}

/*==========================================================
MISE EN PAGE (A4 portrait, mm)
==========================================================*/

const PAGE = { width: 210, height: 297, margin: 16 };
const CONTENT_WIDTH = PAGE.width - PAGE.margin * 2;
const CARD_MAX_HEIGHT = 50;
const CARD_GAP = 5;
/** Haut du pied de page : les cartes s'arrêtent avant. */
const FOOTER_TOP = PAGE.height - 22;

const LINKS = {
  dealer: 'https://ogso-mountain-essentials.com/ogso-dealer-locator/',
  website: 'https://ogso-mountain-essentials.com'
};

/*
 * Les photos des skis sont hébergées sur le site OGSO, qui n'autorise pas
 * leur lecture depuis un autre domaine (CORS). On passe par /ski-photos/,
 * relayé vers le site OGSO par vercel.json (prod) et proxy.conf.json (dev).
 */
const REMOTE_PHOTOS = 'https://ogso-mountain-essentials.com/app/ski-photos/';
const PROXIED_PHOTOS = '/ski-photos/';

const IMAGE_TIMEOUT_MS = 6000;

/** Résolution des images intégrées : suffisante à l'impression, légère à l'envoi. */
const PX_PER_MM = 8;
const JPEG_QUALITY = 0.82;

interface PdfImage {
  data: string;
  width: number;
  height: number;
}

/**
 * Génère la fiche PDF des recommandations :
 * en-tête, profil complet, top 3 avec photo, score et liens, pied de page.
 */
@Injectable({ providedIn: 'root' })
export class SkiPdfService {

  async download(data: SkiPdfData): Promise<void> {
    // jsPDF n'est chargé qu'au moment de l'export (hors du bundle initial)
    const [{ jsPDF }, logo, photos] = await Promise.all([
      import('jspdf'),
      this.loadImage('assets/images/ogsologo.png', 56, 33, COLOR.header),
      Promise.all(data.skis.slice(0, 3).map(ski =>
        ski.src ? this.loadImage(ski.src, 22, CARD_MAX_HEIGHT - 6, COLOR.card) : Promise.resolve(null)
      ))
    ]);

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });

    doc.setProperties({
      title: 'OGSO — Ski Recommendations',
      subject: 'Smart Product Selector results',
      author: 'OGSO',
      creator: 'OGSO Smart Product Selector'
    });

    this.drawBackground(doc);
    this.drawHeader(doc, logo);

    let y = this.drawTitle(doc, 52);
    y = this.drawProfile(doc, data.profile, y + 13);
    this.drawRecommendations(doc, data.skis.slice(0, 3), photos, y + 11);
    this.drawFooter(doc);

    doc.save(`OGSO_Ski_Recommendations_${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  /*========================================================
  SECTIONS
  ========================================================*/

  private drawBackground(doc: jsPDF): void {
    this.fill(doc, COLOR.page);
    doc.rect(0, 0, PAGE.width, PAGE.height, 'F');
  }

  private drawHeader(doc: jsPDF, logo: PdfImage | null): void {
    const { margin } = PAGE;

    this.fill(doc, COLOR.header);
    doc.rect(0, 0, PAGE.width, 34, 'F');

    this.fill(doc, COLOR.orange);
    doc.rect(0, 34, PAGE.width, 0.8, 'F');

    if (logo) {
      const height = 18;
      doc.addImage(logo.data, 'JPEG', margin, 8, height * (logo.width / logo.height), height);
    } else {
      this.font(doc, 18, 'bold', COLOR.white);
      doc.text('OGSO', margin, 20);
    }

    const right = PAGE.width - margin;

    this.font(doc, 7.5, 'bold', COLOR.cyan);
    this.spaced(doc, 'SKI RECOMMENDATIONS', right, 15, 0.6, 'right');

    this.font(doc, 8.5, 'normal', COLOR.muted);
    doc.text(this.formatDate(new Date()), right, 21.5, { align: 'right' });
  }

  private drawTitle(doc: jsPDF, y: number): number {
    this.font(doc, 24, 'bold', COLOR.white);
    doc.text('Your perfect match.', PAGE.margin, y);

    this.font(doc, 10, 'normal', COLOR.text);
    doc.text(
      'Skis selected from your answers to the OGSO Smart Product Selector.',
      PAGE.margin,
      y + 7
    );

    return y + 7;
  }

  /** Profil : 8 critères en grille 4 × 2. */
  private drawProfile(doc: jsPDF, items: PdfProfileItem[], y: number): number {
    y = this.sectionLabel(doc, 'YOUR PROFILE', y);

    const columns = 4;
    const gap = 4;
    const tileWidth = (CONTENT_WIDTH - gap * (columns - 1)) / columns;
    const tileHeight = 15;

    items.forEach((item, index) => {
      const x = PAGE.margin + (index % columns) * (tileWidth + gap);
      const top = y + Math.floor(index / columns) * (tileHeight + gap);

      this.card(doc, x, top, tileWidth, tileHeight, 2.5);

      this.font(doc, 6.5, 'bold', COLOR.muted);
      doc.text(item.label.toUpperCase(), x + 4, top + 5.6, { charSpace: 0.35 });

      this.font(doc, 10.5, 'bold', COLOR.white);
      doc.text(this.fit(doc, item.value, tileWidth - 8), x + 4, top + 11.6);
    });

    const rows = Math.ceil(items.length / columns);

    return y + rows * tileHeight + (rows - 1) * gap;
  }

  /** Top 3 : une carte par ski (rang, photo, nom, specs, score, liens). */
  private drawRecommendations(doc: jsPDF, skis: PdfSki[], photos: (PdfImage | null)[], y: number): void {
    y = this.sectionLabel(doc, 'TOP 3 SKIS', y);

    // Les cartes se partagent l'espace restant au-dessus du pied de page
    const count = Math.max(skis.length, 1);
    const cardHeight = Math.min(CARD_MAX_HEIGHT, (FOOTER_TOP - y - CARD_GAP * (count - 1)) / count);

    skis.forEach((ski, index) => {
      this.drawSkiCard(doc, ski, photos[index], index, y, cardHeight);
      y += cardHeight + CARD_GAP;
    });
  }

  private drawSkiCard(doc: jsPDF, ski: PdfSki, photo: PdfImage | null, index: number, top: number, height: number): void {
    const x = PAGE.margin;
    const right = x + CONTENT_WIDTH;

    this.card(doc, x, top, CONTENT_WIDTH, height, 3.5);

    // Le n°1 est souligné par un liseré orange, comme la carte active de l'app
    if (index === 0) {
      this.fill(doc, COLOR.orange);
      doc.rect(x, top + 6, 1, height - 12, 'F');
    }

    // Rang
    const rankX = x + 10;
    const rankY = top + 12;
    // Contenu centré verticalement dans la carte (hauteur variable)
    const offset = (height - 47) / 2;

    this.fill(doc, RANK_COLORS[index] ?? COLOR.orange);
    doc.circle(rankX, rankY, 4.6, 'F');

    this.font(doc, 10, 'bold', COLOR.header);
    doc.text(String(index + 1), rankX, rankY + 1.3, { align: 'center' });

    // Photo
    const photoBox = { x: x + 20, y: top + 3, width: 22, height: height - 6 };

    if (photo) {
      const scale = Math.min(photoBox.width / photo.width, photoBox.height / photo.height);
      const width = photo.width * scale;
      const imageHeight = photo.height * scale;

      doc.addImage(
        photo.data,
        'JPEG',
        photoBox.x + (photoBox.width - width) / 2,
        photoBox.y + (photoBox.height - imageHeight) / 2,
        width,
        imageHeight
      );
    }

    // Identité
    const textX = x + 50;
    const scoreWidth = 44;
    const textWidth = right - scoreWidth - 8 - textX;
    const family = [ski.family, ski.category].filter(Boolean).join(' · ') || 'OGSO';

    this.font(doc, 7, 'bold', COLOR.orange);
    doc.text(this.fit(doc, family.toUpperCase(), textWidth), textX, top + offset + 10, { charSpace: 0.35 });

    this.font(doc, 15, 'bold', COLOR.white);
    doc.text(this.fit(doc, ski.name, textWidth), textX, top + offset + 17.5);

    // Caractéristiques
    this.spec(doc, 'SIZE', `${ski.size} cm`, textX, top + offset + 26);
    this.spec(doc, 'SIDECUT', ski.sidecut ? `${ski.sidecut} mm` : '—', textX + 26, top + offset + 26);

    // Liens cliquables
    const linkY = top + offset + 39.5;

    this.font(doc, 8.5, 'bold', COLOR.white);

    if (ski.link) {
      doc.textWithLink('Discover the ski  >', textX, linkY, { url: ski.link });
    }

    this.font(doc, 8.5, 'bold', COLOR.muted);
    doc.textWithLink('Find a dealer  >', textX + (ski.link ? 38 : 0), linkY, { url: LINKS.dealer });

    // Score
    const score = Math.max(0, Math.min(100, Math.round(ski.score ?? 0)));
    const scoreX = right - scoreWidth - 6;

    this.font(doc, 6.5, 'bold', COLOR.muted);
    doc.text('MATCH', scoreX, top + offset + 12, { charSpace: 0.35 });

    this.font(doc, 22, 'bold', COLOR.white);
    doc.text(`${score}%`, scoreX - 0.6, top + offset + 22);

    this.fill(doc, COLOR.track);
    doc.roundedRect(scoreX, top + offset + 27, scoreWidth, 2, 1, 1, 'F');

    if (score > 0) {
      this.fill(doc, scoreColor(score));
      doc.roundedRect(scoreX, top + offset + 27, Math.max(2, (scoreWidth * score) / 100), 2, 1, 1, 'F');
    }
  }

  private drawFooter(doc: jsPDF): void {
    const { margin } = PAGE;
    const y = PAGE.height - 12;

    this.stroke(doc, COLOR.cardLine);
    doc.setLineWidth(0.2);
    doc.line(margin, y - 5, PAGE.width - margin, y - 5);

    this.font(doc, 7.5, 'normal', COLOR.muted);
    doc.text('OGSO · Smart Product Selector', margin, y);
    doc.textWithLink('ogso-mountain-essentials.com', PAGE.width - margin - doc.getTextWidth('ogso-mountain-essentials.com'), y, {
      url: LINKS.website
    });
  }

  /*========================================================
  ÉLÉMENTS RÉUTILISABLES
  ========================================================*/

  private sectionLabel(doc: jsPDF, label: string, y: number): number {
    this.fill(doc, COLOR.orange);
    doc.rect(PAGE.margin, y - 2.6, 3, 0.8, 'F');

    this.font(doc, 8, 'bold', COLOR.orange);
    doc.text(label, PAGE.margin + 5, y - 1.6, { charSpace: 0.6 });

    return y + 4;
  }

  /**
   * Texte avec espacement des lettres : jsPDF n'en tient pas compte
   * pour l'alignement à droite, on calcule donc la largeur nous-mêmes.
   */
  private spaced(doc: jsPDF, text: string, x: number, y: number, charSpace: number, align: 'left' | 'right' = 'left'): void {
    const width = doc.getTextWidth(text) + charSpace * (text.length - 1);
    doc.text(text, align === 'right' ? x - width : x, y, { charSpace });
  }

  private spec(doc: jsPDF, label: string, value: string, x: number, y: number): void {
    this.font(doc, 6.5, 'bold', COLOR.muted);
    doc.text(label, x, y, { charSpace: 0.35 });

    this.font(doc, 10, 'bold', COLOR.text);
    doc.text(value, x, y + 5);
  }

  private card(doc: jsPDF, x: number, y: number, width: number, height: number, radius: number): void {
    this.fill(doc, COLOR.card);
    this.stroke(doc, COLOR.cardLine);
    doc.setLineWidth(0.25);
    doc.roundedRect(x, y, width, height, radius, radius, 'FD');
  }

  private font(doc: jsPDF, size: number, style: 'normal' | 'bold', color: Rgb): void {
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  }

  private fill(doc: jsPDF, color: Rgb): void {
    doc.setFillColor(...color);
  }

  private stroke(doc: jsPDF, color: Rgb): void {
    doc.setDrawColor(...color);
  }

  /** Tronque un texte avec « … » s'il dépasse la largeur disponible. */
  private fit(doc: jsPDF, text: string, maxWidth: number): string {
    if (doc.getTextWidth(text) <= maxWidth) {
      return text;
    }

    let result = text;

    while (result.length > 1 && doc.getTextWidth(`${result}…`) > maxWidth) {
      result = result.slice(0, -1);
    }

    return `${result.trimEnd()}…`;
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  /*========================================================
  IMAGES
  ========================================================*/

  /**
   * Charge une image, la réduit à la taille d'affichage et la convertit
   * en JPEG sur le fond de son emplacement (pas de transparence à stocker).
   * Renvoie null si l'image est indisponible : le PDF est généré sans elle.
   */
  private async loadImage(url: string, widthMm: number, heightMm: number, background: Rgb): Promise<PdfImage | null> {
    try {
      const image = new Image();
      image.decoding = 'async';
      image.src = url.startsWith(REMOTE_PHOTOS) ? PROXIED_PHOTOS + url.slice(REMOTE_PHOTOS.length) : url;

      await Promise.race([
        image.decode(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), IMAGE_TIMEOUT_MS))
      ]);

      const scale = Math.min(
        1,
        (widthMm * PX_PER_MM) / image.naturalWidth,
        (heightMm * PX_PER_MM) / image.naturalHeight
      );

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

      const context = canvas.getContext('2d');

      if (!context) {
        return null;
      }

      context.fillStyle = `rgb(${background.join(',')})`;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingQuality = 'high';
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      return {
        data: canvas.toDataURL('image/jpeg', JPEG_QUALITY),
        width: canvas.width,
        height: canvas.height
      };
    } catch {
      return null;
    }
  }
}
