import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.scss'],
  standalone: false
})
export class Step7Component implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('styleVideo')
  styleVideo?: ElementRef<HTMLVideoElement>;

  private destroy$ = new Subject<void>();

  selectedStyle: string | null = null;

  constructor(
    private dataService: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.selectedStyle = profile.skiStyleFun ?? null;
      });
  }

  ngAfterViewInit(): void {
    const video = this.styleVideo?.nativeElement;

    if (!video) {
      return;
    }

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    video.play().catch(error => {
      console.warn('Step 7 video could not autoplay:', error);
    });
  }

  onStyleChange(value: string): void {
    this.selectedStyle = value;
    this.dataService.setSkiStyleFun(value);
  }

  prev(): void {
    this.router.navigate(['/ski/step6']);
  }

  next(): void {
    if (!this.selectedStyle) {
      return;
    }

    this.router.navigate(['/recommanded-skis']);
  }

  ngOnDestroy(): void {
    const video = this.styleVideo?.nativeElement;

    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}