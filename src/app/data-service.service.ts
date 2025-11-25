import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  // ✅ Listes centralisées des options (identiques à celles du quiz)
  terrainOptions = [
    'touring-back-mountain',
    'touring-front-mountain',
    'touring-race',
    'touring-mountaineering',
    'all-mountain',
    'freeride',
    'freetouring',
    'resort',
    'carving',
    'playride'
    

  ];

  snowOptions = [
    'powder',
    'hard',
    'crud'
  ];

  speedOptions = [
    'moderate-speed',
    'high-speed'
  ];

  turnOptions = [
    'short',
    'long'
  ];

  funOptions = [
    'fun-surf',
    'technical-precision',
  ];

  levelOptions = [
    'newbie',
    'intermediate',
    'confirmed',
    'pro-guide'
  ];

  // -------------------------------------------------------
  // BehaviorSubjects (valeurs initiales neutres)
  private dataSourceHeight = new BehaviorSubject<number | null>(null);
  private dataSourceWeight = new BehaviorSubject<number | null>(null);
  private dataSourceSkiLevel = new BehaviorSubject<string | null>(null);
  private dataSourceTypeSnow = new BehaviorSubject<string | null>(null);
  private dataSourceTerrainType = new BehaviorSubject<string | null>(null);
  private dataSourceSkiStyleFun = new BehaviorSubject<string | null>(null);
  private dataSourceTurns = new BehaviorSubject<string | null>(null);
  private dataSourceStable = new BehaviorSubject<string | null>(null);

  // Observables publiques
  height$: Observable<number | null> = this.dataSourceHeight.asObservable();
  weight$: Observable<number | null> = this.dataSourceWeight.asObservable();
  ski_level$: Observable<string | null> = this.dataSourceSkiLevel.asObservable();
  type_snow$: Observable<string | null> = this.dataSourceTypeSnow.asObservable();
  terrain_type$: Observable<string | null> = this.dataSourceTerrainType.asObservable();
  ski_style_fun$: Observable<string | null> = this.dataSourceSkiStyleFun.asObservable();
  turns$: Observable<string | null> = this.dataSourceTurns.asObservable();
  stable$: Observable<string | null> = this.dataSourceStable.asObservable();

  constructor() {}

  // -------------------------------------------------------
  // Méthodes d'envoi unitaires
  sendData(data: number) { this.dataSourceHeight.next(data); }
  sendData2(data: number) { this.dataSourceWeight.next(data); }
  sendData3(data: string) { this.dataSourceSkiLevel.next(data); }
  sendData4(data: string) { this.dataSourceTerrainType.next(data); }
  sendDataT(data: string) { this.dataSourceTypeSnow.next(data); }
  sendDataF(data: string) { this.dataSourceSkiStyleFun.next(data); }
  sendDataTurns(data: string) { this.dataSourceTurns.next(data); }
  sendDataStable(data: string) { this.dataSourceStable.next(data); }

  // -------------------------------------------------------
  // Méthode utilitaire pour mise à jour complète
  setProfile(profile: {
    height?: number | null;
    weight?: number | null;
    skiLevel?: string | null;
    typeSnow?: string | null;
    terrainType?: string | null;
    skiStyleFun?: string | null;
    turns?: string | null;
    stable?: string | null;
  }) {
    if (typeof profile.height === 'number') this.dataSourceHeight.next(profile.height);
    if (typeof profile.weight === 'number') this.dataSourceWeight.next(profile.weight);
    if (typeof profile.skiLevel === 'string') this.dataSourceSkiLevel.next(profile.skiLevel);
    if (typeof profile.typeSnow === 'string') this.dataSourceTypeSnow.next(profile.typeSnow);
    if (typeof profile.terrainType === 'string') this.dataSourceTerrainType.next(profile.terrainType);
    if (typeof profile.skiStyleFun === 'string') this.dataSourceSkiStyleFun.next(profile.skiStyleFun);
    if (typeof profile.turns === 'string') this.dataSourceTurns.next(profile.turns);
    if (typeof profile.stable === 'string') this.dataSourceStable.next(profile.stable);
  }
}
