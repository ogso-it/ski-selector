import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription, Observable, of } from 'rxjs';
import { DataServiceService } from '../data-service.service';
import { getDatabase, ref, set } from 'firebase/database';
import { skis } from 'src/assets/jsons/skis';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';

export interface Ski {
  family?: string;
  category?: string;
  name: string;
  size: number;
  min_height?: number;
  max_height?: number;
  min_weight?: number;
  max_weight?: number;
  ski_level?: string[] | string;
  playground?: string[] | string;
  snow?: string[] | string;
  ski_style?: string[] | string;
  riding_speed?: string[] | string;
  turn?: string[] | string;
  src: string;
  link?: string;
  score?: number;
  difference_weight?: number;
  weight?: number;
  realScore?: number;
}

interface SkiModel {
  name: string;
  availableSizes: number[];
  family?: string;
}

@Component({
  selector: 'app-ski-result',
  templateUrl: './ski-result.component.html',
  styleUrls: ['./ski-result.component.scss'],
  standalone: false
})
export class SkiResultComponent implements OnInit, OnDestroy {
  height: number = 179;
  weight: number = 83;
  terrain_type: string = 'touring-back-mountain';
  type_snow: string = 'powder';
  ski_level_fun: string = 'fun-surf';
  ski_speed: string = 'high-speed';
  ski_turns: string = 'long';
  ski_level: string = 'pro-guide';

  terrainOptions: string[] = [];
  snowOptions: string[] = [];
  speedOptions: string[] = [];
  turnOptions: string[] = [];
  funOptions: string[] = [];
  levelOptions: string[] = [];

  resultat: Ski[] = [];
  bn: boolean = false;
  animationKey = 0;
  isLoading: boolean = false;
  
  isGeneratingPDF: boolean = false;
  pdfGenerated: boolean = false;

  terrainIcons: { [key: string]: string } = {
    'touring-front-mountain': '🏔️',
    'touring-back-mountain': '⛰️',
    'touring-mountaineering': '🧗',
    'touring-race': '🏁',
    'freetouring' : '🎒',
    'all-mountain': '🏞️',
    'resort': '🎿',
    'carving': '🔄',
    'freeride': '🚀',
    'playride': '🛝'
  };

  snowIcons: { [key: string]: string } = {
    'powder': '❄️',
    'crud': '🌨️',
    'hard': '🧊'
  };

  styleIcons: { [key: string]: string } = {
    'fun-surf': '🏄',
    'technical-precision': '🎯'
  };

  speedIcons: { [key: string]: string } = {
    'moderate-speed': '🐢',
    'high-speed': '⚡'
  };

  private subs: Subscription | null = null;
  private skiModels: SkiModel[] = [];

  constructor(public dataService: DataServiceService, private http: HttpClient) {}

  private svcObs(name: string): Observable<any> {
    const svc = this.dataService as any;
    return (svc?.[name] || svc?.[`${name}$`]) ?? of(null);
  }

  get generatedStats() {
    return [
      { label: 'Height', value: `${this.height} cm`, icon: '📏' },
      { label: 'Weight', value: `${this.weight} kg`, icon: '⚖️' },
      { label: 'Terrain', value: this.formatTerrain(this.terrain_type), icon: this.terrainIcons[this.terrain_type] || '🏔️' },
      { label: 'Snow', value: this.formatSnow(this.type_snow), icon: this.snowIcons[this.type_snow] || '❄️' },
      { label: 'Style', value: this.formatStyle(this.ski_level_fun), icon: this.styleIcons[this.ski_level_fun] || '🎨' },
      { label: 'Turns', value: this.formatTurns(this.ski_turns), icon: '🔄' },
      { label: 'Speed', value: this.formatSpeed(this.ski_speed), icon: this.speedIcons[this.ski_speed] || '⚡' }
    ];
  }

  /* ===== MÉTHODES DE FORMATAGE ===== */

  formatTerrain(terrain: string): string {
    const map: {[key: string]: string} = {
      'touring-back-mountain': 'Back Mountain',
      'touring-front-mountain': 'Front Mountain',
      'touring-race': 'Race',
      'touring-mountaineering': 'Mountaineering',
      'freetouring': 'Freetouring',
      'all-mountain': 'All Mountain',
      'freeride': 'Freeride',
      'resort': 'Resort',
      'carving': 'Carving',
      'playride': 'Playride'
    };
    return map[terrain] || terrain;
  }

  formatSnow(snow: string): string {
    const map: {[key: string]: string} = {
      'powder': 'Powder',
      'crud': 'Crud',
      'hard': 'Hard'
    };
    return map[snow] || snow;
  }

  formatStyle(style: string): string {
    const map: {[key: string]: string} = {
      'fun-surf': 'Fun & Surf',
      'technical-precision': 'Technical'
    };
    return map[style] || style;
  }

  formatTurns(turns: string): string {
    const map: {[key: string]: string} = {
      'short': 'Short Turns',
      'long': 'Long Turns'
    };
    return map[turns] || turns;
  }

  formatSpeed(speed: string): string {
    const map: {[key: string]: string} = {
      'moderate-speed': 'Moderate',
      'high-speed': 'High Speed'
    };
    return map[speed] || speed;
  }

  getRankColor(index: number): string {
    const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    return colors[index] || '#ff6a00';
  }

  getScoreColor(score: number): string {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#3b82f6';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  }

  ngOnInit(): void {
    const svcAny = this.dataService as any;
    this.terrainOptions = svcAny?.terrainOptions ?? [
      'touring-back-mountain',
      'touring-front-mountain',
      'touring-race',
      'touring-mountaineering',
      'freetouring',
      'all-mountain',
      'freeride',
      'resort',
      'carving',
      'playride'
    ];
    this.snowOptions = svcAny?.snowOptions ?? ['powder', 'crud', 'hard'];
    this.speedOptions = svcAny?.speedOptions ?? ['moderate-speed', 'high-speed'];
    this.turnOptions = svcAny?.turnOptions ?? ['short', 'long'];
    this.funOptions = svcAny?.funOptions ?? ['fun-surf', 'technical-precision'];
    this.levelOptions = svcAny?.levelOptions ?? ['newbie', 'intermediate', 'confirmed', 'pro-guide'];

    this.initializeSkiModels();

    this.subs = combineLatest([
      this.svcObs('height'),
      this.svcObs('weight'),
      this.svcObs('terrainType'),
      this.svcObs('typeSnow'),
      this.svcObs('skiStyleFun'),
      this.svcObs('turns'),
      this.svcObs('stable'),
      this.svcObs('skiLevel')
    ]).subscribe(([h, w, terrain, snow, styleFun, turns, stable, skiLevel]) => {
      if (h != null) this.height = h;
      if (w != null) this.weight = w;
      if (terrain) this.terrain_type = terrain;
      if (snow) this.type_snow = snow;
      if (styleFun) this.ski_level_fun = styleFun;
      if (turns) this.ski_turns = turns;
      if (stable) this.ski_speed = stable;
      if (skiLevel) this.ski_level = skiLevel;
      this.recalculateRecommendationsWithAnimation();
    });

    this.recalculateRecommendationsWithAnimation();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

async generatePDF(): Promise<void> {
  this.isGeneratingPDF = true;
  
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    
    // ===== COULEURS OGSO =====
    const colors = {
      bgDark: [11, 12, 20],
      bgCard: [30, 30, 40],
      orange: [255, 106, 0],
      white: [255, 255, 255],
      gray: [150, 150, 150],
      lightGray: [200, 200, 200]
    };
    
    // ===== EN-TÊTE =====
    doc.setFillColor(colors.bgDark[0], colors.bgDark[1], colors.bgDark[2]);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setFillColor(colors.orange[0], colors.orange[1], colors.orange[2]);
    doc.rect(0, 30, pageWidth, 5, 'F');
    
    doc.setTextColor(colors.orange[0], colors.orange[1], colors.orange[2]);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('OGSO', margin, 18);
    
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('SKI RECOMMENDATIONS', margin, 26);
    
    const dateStr = new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.setFontSize(8);
    doc.text(dateStr, pageWidth - margin, 18, { align: 'right' });
    
    // ===== PROFIL UTILISATEUR =====
    let yPos = 45;
    
    doc.setTextColor(colors.orange[0], colors.orange[1], colors.orange[2]);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PROFILE', margin, yPos);
    
    yPos += 10;
    
    // Calcul des positions des colonnes
    const colWidth = (pageWidth - (margin * 2)) / 4;
    const colPositions = [
      margin + colWidth/2,           // Colonne 1 (centrée)
      margin + colWidth*1.5,         // Colonne 2 (centrée)
      margin + colWidth*2.5,         // Colonne 3 (centrée)
      margin + colWidth*3.5          // Colonne 4 (centrée)
    ];
    
    // Titres des colonnes
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    
    doc.text('H', colPositions[0], yPos, { align: 'center' });
    doc.text('W', colPositions[1], yPos, { align: 'center' });
    doc.text('TER', colPositions[2], yPos, { align: 'center' });
    doc.text('SNOW', colPositions[3], yPos, { align: 'center' });
    
    yPos += 5;
    
    // Carte profil
    doc.setFillColor(colors.bgCard[0], colors.bgCard[1], colors.bgCard[2]);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 20, 3, 3, 'F');
    
    // Valeurs du profil (centrées sous chaque titre)
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    doc.text(`${this.height} cm`, colPositions[0], yPos + 13, { align: 'center' });
    doc.text(`${this.weight} kg`, colPositions[1], yPos + 13, { align: 'center' });
    doc.text(this.formatTerrain(this.terrain_type), colPositions[2], yPos + 13, { align: 'center' });
    doc.text(this.formatSnow(this.type_snow), colPositions[3], yPos + 13, { align: 'center' });
    
    yPos += 35;
    
    // ===== TOP 3 SKIS =====
    doc.setTextColor(colors.orange[0], colors.orange[1], colors.orange[2]);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('TOP 3 SKIS', margin, yPos);
    
    yPos += 10;
    
    for (let i = 0; i < Math.min(3, this.resultat.length); i++) {
      const ski = this.resultat[i];
      
      // Carte
      doc.setFillColor(colors.bgCard[0], colors.bgCard[1], colors.bgCard[2]);
      doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 35, 3, 3, 'F');
      
      // ===== RANG CENTRÉ DANS LE CERCLE =====
      const medalColors = [
        [255, 215, 0],   // Or
        [192, 192, 192], // Argent
        [205, 127, 50]   // Bronze
      ];
      
      const circleX = margin + 17;
      const circleY = yPos + 12;
      const circleRadius = 8;
      
      doc.setFillColor(medalColors[i][0], medalColors[i][1], medalColors[i][2]);
      doc.circle(circleX, circleY, circleRadius, 'F');
      
      doc.setTextColor(colors.bgDark[0], colors.bgDark[1], colors.bgDark[2]);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${i + 1}`, circleX, circleY + 4, { align: 'center' });
      
      // ===== NOM ET FAMILLE =====
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(ski.name, margin + 40, yPos + 12);
      
      doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(ski.family || 'OGSO', margin + 40, yPos + 21);
      
      // ===== SPÉCIFICATIONS (centrées) =====
      const specsX = pageWidth / 2 - 10;
      doc.setTextColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`${ski.size}cm`, specsX, yPos + 12);
      doc.text(`${ski.weight || 'N/A'}g`, specsX, yPos + 21);
      
      // ===== SCORE CENTRÉ DANS LE RECTANGLE =====
      const score = ski.score || 0;
      
      let scoreRgb;
      if (score >= 90) scoreRgb = [16, 185, 129];   // Vert
      else if (score >= 70) scoreRgb = [59, 130, 246]; // Bleu
      else if (score >= 50) scoreRgb = [245, 158, 11]; // Orange
      else scoreRgb = [239, 68, 68]; // Rouge
      
      const scoreX = pageWidth - margin - 40;
      const scoreY = yPos + 7;
      const scoreWidth = 30;
      const scoreHeight = 18;
      
      doc.setFillColor(scoreRgb[0], scoreRgb[1], scoreRgb[2]);
      doc.roundedRect(scoreX, scoreY, scoreWidth, scoreHeight, 5, 5, 'F');
      
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`${score}%`, scoreX + scoreWidth/2, scoreY + scoreHeight/2 + 2, { align: 'center' });
      
      yPos += 42;
    }
    
    // ===== FOOTER =====
    doc.setDrawColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
    
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('OGSO - Smart Product Selector', pageWidth / 2, pageHeight - 8, { align: 'center' });
    
    const fileName = `OGSO_Ski_Recommendations_${new Date().getTime()}.pdf`;
    doc.save(fileName);
    
    this.pdfGenerated = true;
    setTimeout(() => this.pdfGenerated = false, 3000);
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    this.isGeneratingPDF = false;
  }
}
  private hexToRgb(hex: string): { r: number, g: number, b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }
  
  async generateAndDownloadPDF(): Promise<void> {
    if (this.resultat.length === 0) {
      alert('No ski recommendations to export.');
      return;
    }
    await this.generatePDF();
  }

  onInlineCriteriaChange(): void {
    const svc = this.dataService as any;
    if (svc?.setProfile) {
      svc.setProfile({
        height: this.height,
        weight: this.weight,
        terrainType: this.terrain_type,
        typeSnow: this.type_snow,
        skiStyleFun: this.ski_level_fun,
        turns: this.ski_turns,
        stable: this.ski_speed,
        skiLevel: this.ski_level
      });
    }
    this.recalculateRecommendationsWithAnimation();
  }

  private initializeSkiModels(): void {
    const allSkis: Ski[] = (skis as any[])?.filter(x => !!x) ?? [];
    const modelMap = new Map<string, number[]>();
    
    allSkis.forEach(ski => {
      if (!modelMap.has(ski.name)) {
        modelMap.set(ski.name, []);
      }
      if (!modelMap.get(ski.name)!.includes(ski.size)) {
        modelMap.get(ski.name)!.push(ski.size);
      }
    });

    this.skiModels = Array.from(modelMap.entries()).map(([name, sizes]) => ({
      name,
      availableSizes: sizes.sort((a, b) => a - b),
      family: allSkis.find(ski => ski.name === name)?.family
    }));
  }

  private findOptimalSize(skiName: string, userHeight: number): number {
    const model = this.skiModels.find(m => m.name === skiName);
    if (!model || !model.availableSizes.length) return userHeight;

    let targetHeight = userHeight;
    const lowerName = skiName.toLowerCase();

    if (lowerName.includes('sts') || lowerName.includes('swiss') || lowerName.includes('grand') || lowerName.includes('daddy')) {
      targetHeight = userHeight - 7.5;
    } else if (lowerName.includes('croix') || lowerName.includes('fer') || lowerName.includes('touno')) {
      targetHeight = userHeight - 2.5;
    }

    return model.availableSizes.reduce((prev, curr) => 
      Math.abs(curr - targetHeight) < Math.abs(prev - targetHeight) ? curr : prev
    );
  }

  openSki(ski: Ski): void {
    if (ski.link) {
      window.open(ski.link, '_blank');
    } else {
      alert(`🎿 ${ski.name}\n📏 Size: ${ski.size}cm\n⭐ Score: ${ski.score}%`);
    }
    this.trackSkiSelection(ski);
  }

  recalculateRecommendationsWithAnimation(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.recalculateRecommendations();
      this.isLoading = false;
      this.animationKey++;
    }, 100);
  }

  private trackSkiSelection(ski: Ski): void {
    try {
      const db = getDatabase();
      set(ref(db, 'ski_selections/' + Date.now()), {
        timestamp: new Date().toISOString(),
        ski_name: ski.name,
        ski_size: ski.size,
        ski_score: ski.score,
        user_height: this.height,
        user_weight: this.weight
      });
    } catch (error) {
      console.log('Analytics tracking failed:', error);
    }
  }

  private recalculateRecommendations(): void {
    this.resultat = [];
    const ar: Ski[] = (skis as any[])?.filter(x => !!x) ?? [];
    
    if (ar.length === 0) {
      console.warn('No ski data found');
      return;
    }

    const scoredSkis: Ski[] = [];

    for (const ski of ar) {
      let realScore = 100;

      if (ski.playground && !(Array.isArray(ski.playground) ? ski.playground.includes(this.terrain_type) : ski.playground === this.terrain_type)) {
        realScore -= 10;
      }
      if (ski.snow && !(Array.isArray(ski.snow) ? ski.snow.includes(this.type_snow) : ski.snow === this.type_snow)) {
        realScore -= 10;
      }
      if (ski.riding_speed && !(Array.isArray(ski.riding_speed) ? ski.riding_speed.includes(this.ski_speed) : ski.riding_speed === this.ski_speed)) {
        realScore -= 5;
      }
      if (ski.turn && !(Array.isArray(ski.turn) ? ski.turn.includes(this.ski_turns) : ski.turn === this.ski_turns)) {
        realScore -= 5;
      }
      if (ski.ski_style && !(Array.isArray(ski.ski_style) ? ski.ski_style.includes(this.ski_level_fun) : ski.ski_style === this.ski_level_fun)) {
        realScore -= 10;
      }

      realScore = Math.max(0, realScore);

      scoredSkis.push({
        ...ski,
        realScore,
        score: realScore
      });
    }

    scoredSkis.sort((a, b) => (b.realScore ?? 0) - (a.realScore ?? 0));
    
    const uniqueSkis = scoredSkis.reduce((acc: Ski[], cur: Ski) => {
      if (!acc.find(x => x.name === cur.name)) acc.push(cur);
      return acc;
    }, []);

    const topSkis = uniqueSkis.slice(0, 6);
    
    this.resultat = topSkis.map((ski, index) => {
      const optimalSize = this.findOptimalSize(ski.name, this.height);
      const optimalSki = ar.find(s => s.name === ski.name && s.size === optimalSize) || ski;
      
      const displayScores = [100, 90, 80, 70, 60, 50];
      
      return {
        ...optimalSki,
        score: displayScores[index] || ski.realScore
      };
    });

    this.writeUserDataIfPossible();
    
  }

  private writeUserDataIfPossible(): void {
    if (!this.resultat.length) return;
    try {
      const db = getDatabase();
      set(ref(db, 'ski_data/' + Date.now()), {
        date: new Date().toISOString().split('T')[0],
        ski1: this.resultat[0]?.name,
        ski2: this.resultat[1]?.name,
        ski3: this.resultat[2]?.name,
        height: this.height,
        weight: this.weight
      });
    } catch (e) {
      // silent fail
    }
  }
}