import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css'],
  standalone: false
})
export class Step4Component implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  hidden: boolean = false;
  type_snow: string | null = null;

  constructor(
    private dataService: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.type_snow = profile.typeSnow;
        this.hidden = !!profile.typeSnow;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSnowTypeChange(value: string): void {
    this.hidden = true;
    this.type_snow = value;
    this.dataService.setTypeSnow(value);
    console.log('Snow type selected:', value);
  }

  prev(): void {
    this.router.navigate(['/ski/step3']);
  }

  next(): void {
    if (this.hidden) {
      this.router.navigate(['/ski/step5']);
    }
  }
}