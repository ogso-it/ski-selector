import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { combineLatest, Subscription, Observable, of } from 'rxjs';
import { DataServiceService } from '../data-service.service';
import { getDatabase, ref, set } from 'firebase/database';
import { skis } from 'src/assets/jsons/skis';
import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations';

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
  realScore?: number; // Nouveau champ pour stocker le score réel
}

@Component({
  selector: 'app-ski-result',
  templateUrl: './ski-result.component.html',
  styleUrls: ['./ski-result.component.scss'],
  standalone: false,
  animations: [
    // Animation pour la liste
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(40px) scale(0.8)' }),
          stagger('100ms', [
            animate('1200ms cubic-bezier(0.25, 0.8, 0.25, 1)', keyframes([
              style({ opacity: 0, transform: 'translateY(40px) scale(0.8)', offset: 0 }),
              style({ opacity: 0.8, transform: 'translateY(-15px) scale(1.08)', offset: 0.4 }),
              style({ opacity: 0.9, transform: 'translateY(5px) scale(0.98)', offset: 0.7 }),
              style({ opacity: 1, transform: 'translateY(0) scale(1)', offset: 1 })
            ]))
          ])
        ], { optional: true })
      ])
    ]),
    // Animation pour les cartes
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.7) translateY(30px) rotateX(45deg)' }),
        animate('1000ms 300ms cubic-bezier(0.34, 1.56, 0.64, 1)', keyframes([
          style({ opacity: 0, transform: 'scale(0.7) translateY(30px) rotateX(45deg)', offset: 0 }),
          style({ opacity: 0.8, transform: 'scale(1.1) translateY(-10px) rotateX(-10deg)', offset: 0.5 }),
          style({ opacity: 1, transform: 'scale(1) translateY(0) rotateX(0deg)', offset: 1 })
        ]))
      ])
    ]),
    // Animation pour les images
    trigger('imageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.6) rotate(-8deg) translateY(20px)' }),
        animate('1100ms 400ms cubic-bezier(0.34, 1.56, 0.64, 1)', keyframes([
          style({ opacity: 0, transform: 'scale(0.6) rotate(-8deg) translateY(20px)', offset: 0 }),
          style({ opacity: 0.9, transform: 'scale(1.15) rotate(3deg) translateY(-5px)', offset: 0.6 }),
          style({ opacity: 1, transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 })
        ]))
      ])
    ]),
    // Animation pour les scores
    trigger('scoreAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0) rotate(180deg)' }),
        animate('700ms 900ms cubic-bezier(0.18, 1.25, 0.4, 1)', keyframes([
          style({ opacity: 0, transform: 'scale(0) rotate(180deg)', offset: 0 }),
          style({ opacity: 0.8, transform: 'scale(1.3) rotate(-15deg)', offset: 0.7 }),
          style({ opacity: 1, transform: 'scale(1) rotate(0deg)', offset: 1 })
        ]))
      ])
    ]),
    // Animation pour les badges
    trigger('badgeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0) translateY(-20px)' }),
        animate('600ms 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', keyframes([
          style({ opacity: 0, transform: 'scale(0) translateY(-20px)', offset: 0 }),
          style({ opacity: 1, transform: 'scale(1.2) translateY(5px)', offset: 0.6 }),
          style({ opacity: 1, transform: 'scale(1) translateY(0)', offset: 1 })
        ]))
      ])
    ])
  ]
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

  // Icônes pour les différents critères
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
    'playride': '🛝',
    
  };

  snowIcons: { [key: string]: string } = {
    'powder': '❄️',
    'crud': '🌨️',
    'hard': '🧊',
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

  constructor(public dataService: DataServiceService) {}

  private svcObs(name: string): Observable<any> {
    const svc = this.dataService as any;
    return (svc?.[name] || svc?.[`${name}$`]) ?? of(null);
  }

  get generatedStats() {
    return [
      { label: '📏 Height', value: `${this.height} cm`, icon: '📏' },
      { label: '⚖️ Weight', value: `${this.weight} kg`, icon: '⚖️' },
      { label: '🏔️ Terrain', value: this.terrain_type, icon: this.terrainIcons[this.terrain_type] || '🏔️' },
      { label: '❄️ Snow', value: this.type_snow, icon: this.snowIcons[this.type_snow] || '❄️' },
      { label: '🎨 Style', value: this.ski_level_fun, icon: this.styleIcons[this.ski_level_fun] || '🎨' },
      { label: '🔄 Turns', value: this.ski_turns, icon: '🔄' },
      { label: '⚡ Speed', value: this.ski_speed, icon: this.speedIcons[this.ski_speed] || '⚡' }
    ];
  }

  getScoreColor(score: number): string {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#3b82f6';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  }

  getScoreIcon(score: number): string {
    if (score >= 90) return '⭐';
    if (score >= 70) return '🔥';
    if (score >= 50) return '👍';
    return '💫';
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
    this.snowOptions = svcAny?.snowOptions ?? ['powder', 'crud', 'hard', 'packed'];
    this.speedOptions = svcAny?.speedOptions ?? ['moderate-speed', 'high-speed'];
    this.turnOptions = svcAny?.turnOptions ?? ['short', 'long'];
    this.funOptions = svcAny?.funOptions ?? ['fun-surf', 'technical-precision'];
    this.levelOptions = svcAny?.levelOptions ?? ['newbie', 'intermediate', 'confirmed', 'pro-guide'];

    this.subs = combineLatest([
      this.svcObs('height'),
      this.svcObs('weight'),
      this.svcObs('terrain_type'),
      this.svcObs('type_snow'),
      this.svcObs('ski_style_fun'),
      this.svcObs('turns'),
      this.svcObs('stable')
    ]).subscribe(([h, w, terrain, snow, styleFun, turns, stable]) => {
      if (h != null) this.height = h;
      if (w != null) this.weight = w;
      if (terrain) this.terrain_type = terrain;
      if (snow) this.type_snow = snow;
      if (styleFun) this.ski_level_fun = styleFun;
      if (turns) this.ski_turns = turns;
      if (stable) this.ski_speed = stable;
      this.recalculateRecommendationsWithAnimation();
    });

    this.recalculateRecommendationsWithAnimation();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  onInlineCriteriaChange(): void {
    const svc = this.dataService as any;
    if (svc?.setProfile) {
      try {
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
      } catch {}
    }
    this.recalculateRecommendationsWithAnimation();
  }

  /**
   * Ouvre les détails d'un ski sélectionné
   */
  openSki(ski: Ski): void {
    console.log('Ski sélectionné:', ski);
    // Afficher le score réel dans la console pour debug
    console.log('Score réel:', ski.realScore, 'Score affiché:', ski.score);
    
    if (ski.link) {
      setTimeout(() => {
        window.open(ski.link, '_blank');
      }, 300);
    } else {
      setTimeout(() => {
        alert(`🎿 ${ski.name}\n📏 Taille: ${ski.size}cm\n⭐ Score réel: ${ski.realScore}\n⚖️ Poids: ${ski.weight}g\n🏔️ Famille: ${ski.family || 'N/A'}`);
      }, 200);
    }
    this.trackSkiSelection(ski);
  }

  /**
   * Recalcule les recommandations avec une animation élégante
   * Maintenant publique pour être accessible depuis le template
   */
  recalculateRecommendationsWithAnimation(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.recalculateRecommendations();
      this.isLoading = false;
      this.animationKey++;
    }, 100);
  }

  /**
   * Track ski selection for analytics
   */
  private trackSkiSelection(ski: Ski): void {
    try {
      const db = getDatabase();
      set(ref(db, 'ski_selections/' + Date.now()), {
        timestamp: new Date().toISOString(),
        ski_name: ski.name,
        ski_size: ski.size,
        ski_score: ski.score,
        ski_real_score: ski.realScore, // Enregistrer aussi le score réel
        user_height: this.height,
        user_weight: this.weight,
        terrain_type: this.terrain_type,
        snow_type: this.type_snow
      });
    } catch (error) {
      console.log('Analytics tracking failed:', error);
    }
  }

  private recalculateRecommendations(): void {
    this.resultat = [];
    this.bn = false;
    
    // Prendre tous les skis sans filtrer par height
    let ar: Ski[] = (skis as any[])?.filter(x => !!x) ?? [];

    // // Filtrer les skis de type touring-race
    // ar = ar.filter(ski => {
    //   const pg = ski.playground;
    //   return pg ? !(Array.isArray(pg) ? pg.includes('touring-race') : pg === 'touring-race') : true;
    // });

    const scoredSkis: Ski[] = [];

    for (const ski of ar) {
      let realScore = 0;
      
      // Calcul du score réel avec 25 points par critère
      if (ski.playground && (Array.isArray(ski.playground) ? ski.playground.includes(this.terrain_type) : ski.playground === this.terrain_type)) 
        realScore += 25;
      
      if (ski.snow && (Array.isArray(ski.snow) ? ski.snow.includes(this.type_snow) : ski.snow === this.type_snow)) 
        realScore += 25;
      
      if (ski.riding_speed && (Array.isArray(ski.riding_speed) ? ski.riding_speed.includes(this.ski_speed) : ski.riding_speed === this.ski_speed)) 
        realScore += 25;
      
      if (ski.ski_style && (Array.isArray(ski.ski_style) ? ski.ski_style.includes(this.ski_level_fun) : ski.ski_style === this.ski_level_fun)) 
        realScore += 25;

      if (realScore >= 80) {
        const difference_weight = 0;
        scoredSkis.push({
          name: ski.name,
          src: ski.src,
          size: ski.size,
          link: ski.link,
          score: realScore, // Score réel pour le tri
          realScore: realScore, // Sauvegarde du score réel
          family: ski.family,
          category: ski.category,
          min_height: ski.min_height,
          max_height: ski.max_height,
          min_weight: ski.min_weight,
          max_weight: ski.max_weight,
          ski_level: ski.ski_level,
          playground: ski.playground,
          snow: ski.snow,
          ski_style: ski.ski_style,
          riding_speed: ski.riding_speed,
          turn: ski.turn,
          difference_weight,
          weight: ski.weight
        });
      }
    }

    // Trier par score réel décroissant
    scoredSkis.sort((a, b) => (b.realScore ?? 0) - (a.realScore ?? 0));

    // Éliminer les doublons par nom (garder le meilleur score pour chaque modèle)
    const uniqueSkis = scoredSkis.reduce((acc: Ski[], cur: Ski) => {
      const existing = acc.find(x => x.name === cur.name);
      if (!existing) acc.push(cur);
      return acc;
    }, []);

    // 🔥 NORMALISATION DES SCORES : 100, 90, 80 pour les 3 premiers
    this.resultat = uniqueSkis.slice(0, 6).map((ski, index) => {
      let displayScore: number;
      
      switch (index) {
        case 0: displayScore = 100; break;
        case 1: displayScore = 90; break;
        case 2: displayScore = 80; break;
        case 3: displayScore = 70; break;
        case 4: displayScore = 60; break;
        case 5: displayScore = 50; break;
        default: displayScore = ski.realScore || 0;
      }
      
      return {
        ...ski,
        score: displayScore // Score affiché normalisé
      };
    });

    this.writeUserDataIfPossible();
  }

  private writeUserDataIfPossible(): void {
    if (!this.resultat.length) return;
    try {
      const db = getDatabase();
      set(ref(db, 'ski_data/' + Date.now()), {
        todayDate: new Date().toISOString().split('T')[0],
        recomanded_ski1: this.resultat[0]?.name ?? null,
        recomanded_ski2: this.resultat[1]?.name ?? null,
        recomanded_ski3: this.resultat[2]?.name ?? null,
        height: this.height,
        weight: this.weight,
        snow: this.type_snow,
        terrain: this.terrain_type
      });
    } catch {}
  }
}