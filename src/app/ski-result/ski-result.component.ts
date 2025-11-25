import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { combineLatest, Subscription, Observable, of } from 'rxjs';
import { DataServiceService } from '../data-service.service';
import { getDatabase, ref, set } from 'firebase/database';
import { skis } from 'src/assets/jsons/skis';

import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  keyframes
} from '@angular/animations';

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
}

@Component({
  selector: 'app-ski-result',
  templateUrl: './ski-result.component.html',
  styleUrls: ['./ski-result.component.scss'],
  standalone: false,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(40px) scale(0.8)' }),
          stagger('100ms', [
            animate(
              '1200ms cubic-bezier(0.25, 0.8, 0.25, 1)',
              keyframes([
                style({ opacity: 0, transform: 'translateY(40px) scale(0.8)', offset: 0 }),
                style({ opacity: 0.8, transform: 'translateY(-15px) scale(1.08)', offset: 0.4 }),
                style({ opacity: 0.9, transform: 'translateY(5px) scale(0.98)', offset: 0.7 }),
                style({ opacity: 1, transform: 'translateY(0) scale(1)', offset: 1 })
              ])
            )
          ])
        ], { optional: true })
      ])
    ]),

    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.7) translateY(30px) rotateX(45deg)' }),
        animate(
          '1000ms 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          keyframes([
            style({ opacity: 0, transform: 'scale(0.7) translateY(30px) rotateX(45deg)', offset: 0 }),
            style({ opacity: 0.8, transform: 'scale(1.1) translateY(-10px) rotateX(-10deg)', offset: 0.5 }),
            style({ opacity: 1, transform: 'scale(1) translateY(0) rotateX(0deg)', offset: 1 })
          ])
        )
      ])
    ]),

    trigger('imageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.6) rotate(-8deg) translateY(20px)' }),
        animate(
          '1100ms 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          keyframes([
            style({ opacity: 0, transform: 'scale(0.6) rotate(-8deg) translateY(20px)', offset: 0 }),
            style({ opacity: 0.9, transform: 'scale(1.15) rotate(3deg) translateY(-5px)', offset: 0.6 }),
            style({ opacity: 1, transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 })
          ])
        )
      ])
    ]),

    trigger('scoreAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0) rotate(180deg)' }),
        animate(
          '700ms 900ms cubic-bezier(0.18, 1.25, 0.4, 1)',
          keyframes([
            style({ opacity: 0, transform: 'scale(0) rotate(180deg)', offset: 0 }),
            style({ opacity: 0.8, transform: 'scale(1.3) rotate(-15deg)', offset: 0.7 }),
            style({ opacity: 1, transform: 'scale(1) rotate(0deg)', offset: 1 })
          ])
        )
      ])
    ]),

    trigger('badgeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0) translateY(-20px)' }),
        animate(
          '600ms 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          keyframes([
            style({ opacity: 0, transform: 'scale(0) translateY(-20px)', offset: 0 }),
            style({ opacity: 1, transform: 'scale(1.2) translateY(5px)', offset: 0.6 }),
            style({ opacity: 1, transform: 'scale(1) translateY(0)', offset: 1 })
          ])
        )
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

  terrainIcons: { [key: string]: string } = {
    'touring-front-mountain': '🏔️',
    'touring-back-mountain': '⛰️',
    'touring-mountaineering': '🧗',
    'resort': '🎿',
    'carving': '🔄',
    'freeride': '🚀'
  };

  snowIcons: { [key: string]: string } = {
    powder: '❄️',
    crud: '🌨️',
    hard: '🧊',
    packed: '⛄'
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
      'touring-front-mountain',
      'touring-back-mountain',
      'touring-mountaineering',
      'resort',
      'carving',
      'freeride'
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

  openSki(ski: Ski): void {
    console.log('Ski sélectionné:', ski);

    if (ski.link) {
      setTimeout(() => window.open(ski.link!, '_blank'), 300);
    } else {
      setTimeout(() => {
        alert(
          `🎿 ${ski.name}\n📏 Taille: ${ski.size}cm\n⭐ Score: ${ski.score}\n⚖️ Poids: ${ski.weight}g\n🏔️ Famille: ${ski.family || 'N/A'}`
        );
      }, 200);
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
        user_weight: this.weight,
        terrain_type: this.terrain_type,
        snow_type: this.type_snow
      });
    } catch (err) {
      console.log('Analytics tracking failed:', err);
    }
  }

  private writeUserDataIfPossible(): void {
    try {
      const db = getDatabase();
      set(ref(db, 'last_recommendation/' + Date.now()), {
        height: this.height,
        weight: this.weight,
        terrain: this.terrain_type,
        snow: this.type_snow
      });
    } catch {}
  }

  private recalculateRecommendations(): void {
    this.resultat = [];
    this.bn = false;

    let ar: Ski[] = (skis as any[])?.filter(x => !!x) ?? [];

    // Only height compatibility now
    ar = ar.filter(ski => {
      const byHeight =
        this.height >= (ski.min_height ?? 0) &&
        this.height <= (ski.max_height ?? 999);
      return byHeight;
    });

    // BONNATI CHECK
    const bonnati_check = ar.filter(ski => {
      const pg = ski.playground;
      return pg && (Array.isArray(pg) ? pg.includes(this.terrain_type) : pg === this.terrain_type);
    });

    if (bonnati_check.length === 1) {
      const s = bonnati_check[0];
      for (let i = 0; i < 3; i++) {
        this.resultat.push({
          ...s,
          score: (s.score ?? 100) - i,
          difference_weight: 0
        });
      }
      this.bn = true;
      this.writeUserDataIfPossible();
      return;
    }

    // remove touring-race
    ar = ar.filter(ski => {
      const pg = ski.playground;
      return pg
        ? !(Array.isArray(pg) ? pg.includes('touring-race') : pg === 'touring-race')
        : true;
    });

    // SCORE CALCULATION
    for (const ski of ar) {
      let score = 0;

      if (ski.playground &&
        (Array.isArray(ski.playground) ? ski.playground.includes(this.terrain_type) : ski.playground === this.terrain_type))
        score += 40;

      if (ski.snow &&
        (Array.isArray(ski.snow) ? ski.snow.includes(this.type_snow) : ski.snow === this.type_snow))
        score += 30;

      if (ski.riding_speed &&
        (Array.isArray(ski.riding_speed) ? ski.riding_speed.includes(this.ski_speed) : ski.riding_speed === this.ski_speed))
        score += 20;

      if (ski.ski_style &&
        (Array.isArray(ski.ski_style) ? ski.ski_style.includes(this.ski_level_fun) : ski.ski_style === this.ski_level_fun))
        score += 10;

      if (score >= 20) {
        this.resultat.push({
          ...ski,
          score,
          difference_weight: 0
        });
      }
    }

    this.resultat.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    this.writeUserDataIfPossible();
  }
}
