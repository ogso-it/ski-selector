import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.css'],
  standalone: false
})
export class Step6Component implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  hidden = false;
  selectedSpeed: string | null = null;

  constructor(
    private dataService: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.dataService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {

        this.selectedSpeed = profile.stable;

        if (profile.stable) {
          this.hidden = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSpeedChange(value: string): void {

    this.selectedSpeed = value;
    this.hidden = true;

    this.dataService.setStable(value);

    console.log('Speed preference selected:', value);
  }

  prev(): void {
    this.router.navigate(['/ski/step5']);
  }

  next(): void {

    if (!this.selectedSpeed) {
      return;
    }

    this.router.navigate(['/ski/step7']);
  }
}