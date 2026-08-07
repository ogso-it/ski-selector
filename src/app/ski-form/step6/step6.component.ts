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
    selector: 'app-step6',
    templateUrl: './step6.component.html',
    styleUrls: ['./step6.component.scss'],
    standalone: false
})
export class Step6Component
    implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('speedVideo')
    speedVideo?: ElementRef<HTMLVideoElement>;

    private readonly destroy$ = new Subject<void>();

    private readonly videoSource =
        'assets/images/apparence6.webm';

    selectedSpeed: string | null = null;

    constructor(
        private readonly dataService: DataServiceService,
        private readonly router: Router
    ) {}


    ngOnInit(): void {

        this.dataService.profile$
            .pipe(takeUntil(this.destroy$))
            .subscribe(profile => {

                this.selectedSpeed =
                    profile.stable ?? null;

            });

    }


    ngAfterViewInit(): void {

        this.loadVideo();

    }


    ngOnDestroy(): void {

        this.destroy$.next();
        this.destroy$.complete();

    }


    onSpeedChange(value: string): void {

        if (
            value !== 'moderate-speed' &&
            value !== 'high-speed'
        ) {
            return;
        }

        this.selectedSpeed = value;

        this.dataService.setStable(value);

        this.playVideo();

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


    private loadVideo(): void {

        const video =
            this.speedVideo?.nativeElement;

        if (!video) {
            return;
        }

        const currentSource =
            video.getAttribute('src') ?? '';

        if (
            currentSource !== this.videoSource &&
            !video.src.endsWith(this.videoSource)
        ) {
            video.src = this.videoSource;
            video.load();
        }

        this.playVideo();

    }


    private playVideo(): void {

        const video =
            this.speedVideo?.nativeElement;

        if (!video) {
            return;
        }

        video.muted = true;
        video.loop = true;

        video.play().catch(() => {
            // Le navigateur peut bloquer la lecture automatique.
        });

    }

}