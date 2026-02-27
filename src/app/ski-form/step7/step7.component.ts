import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.css'],
  standalone: false
})
export class Step7Component implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  hidden: boolean = false;
  selectedStyle: string | null = null;

  constructor(
    private dataService: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.selectedStyle = profile.skiStyleFun;  // ← Changé de skiingStyle à skiStyleFun
        this.hidden = !!profile.skiStyleFun;        // ← Changé ici aussi
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onStyleChange(value: string): void {
    this.selectedStyle = value;
    this.hidden = true;
    this.dataService.setSkiStyleFun(value);  // ← Changé de setSkiingStyle à setSkiStyleFun
    console.log('Skiing style selected:', value);
  }

  prev(): void {
    this.router.navigate(['/ski/step6']);
  }

  next(): void {
    if (this.hidden) {
      this.router.navigate(['/recommanded-skis']);
    }
  }
}