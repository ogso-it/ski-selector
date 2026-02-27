import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css'],
  standalone: false
})
export class Step5Component implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  hidden: boolean = false;
  selectedTurn: string | null = null;

  constructor(
    private dataService: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.selectedTurn = profile.turns;
        this.hidden = !!profile.turns;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTurnChange(value: string): void {
    this.selectedTurn = value;
    this.hidden = true;
    this.dataService.setTurns(value);
    console.log('Turn preference selected:', value);
  }

  prev(): void {
    this.router.navigate(['/ski/step4']);
  }

  next(): void {
    if (this.hidden) {
      this.router.navigate(['/ski/step6']);
    }
  }
}