import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SkiProfile {
  height: number | null;
  weight: number | null;
  skiLevel: string | null;
  terrainType: string | null;
  typeSnow: string | null;
  skiStyleFun: string | null;
  turns: string | null;
  stable: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  /* ================= STATE CENTRAL ================= */

  private readonly STORAGE_KEY = 'ski_profile_data';
  private defaultProfile: SkiProfile = {
    height: null,
    weight: null,
    skiLevel: null,
    terrainType: null,
    typeSnow: null,
    skiStyleFun: null,
    turns: null,
    stable: null
  };

  private profileSubject = new BehaviorSubject<SkiProfile>(this.loadFromStorage());

  profile$ = this.profileSubject.asObservable();

  constructor() {
    // Load profile from localStorage on service initialization
    const savedProfile = this.loadFromStorage();
    if (savedProfile !== this.defaultProfile) {
      this.profileSubject.next(savedProfile);
    }
  }

  /* ================= GET CURRENT VALUE ================= */

  get profile(): SkiProfile {
    return this.profileSubject.value;
  }

  /* ================= UPDATE METHODS ================= */

  setHeight(height: number) {
    this.update({ height });
  }

  setWeight(weight: number) {
    this.update({ weight });
  }

  setSkiLevel(skiLevel: string) {
    this.update({ skiLevel });
  }

  setTerrainType(terrainType: string) {
    this.update({ terrainType });
  }

  setTypeSnow(typeSnow: string) {
    this.update({ typeSnow });
  }

  setSkiStyleFun(skiStyleFun: string) {
    this.update({ skiStyleFun });
  }

  setTurns(turns: string) {
    this.update({ turns });
  }

  setStable(stable: string) {
    this.update({ stable });
  }

  /* ================= INTERNAL UPDATE ================= */

  private update(patch: Partial<SkiProfile>) {
    const updatedProfile = {
      ...this.profileSubject.value,
      ...patch
    };
    this.profileSubject.next(updatedProfile);
    this.saveToStorage(updatedProfile);
  }

  /* ================= RESET ================= */

  reset() {
    this.profileSubject.next(this.defaultProfile);
    this.clearStorage();
  }

  /* ================= STORAGE METHODS ================= */

  private saveToStorage(profile: SkiProfile): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
      }
    } catch (error) {
      console.warn('Failed to save profile to localStorage:', error);
    }
  }

  private loadFromStorage(): SkiProfile {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored) as SkiProfile;
        }
      }
    } catch (error) {
      console.warn('Failed to load profile from localStorage:', error);
    }
    return this.defaultProfile;
  }

  private clearStorage(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    } catch (error) {
      console.warn('Failed to clear profile from localStorage:', error);
    }
  }
}
