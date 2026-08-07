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
    selector: 'app-step4',
    templateUrl: './step4.component.html',
    styleUrls: ['./step4.component.scss'],
    standalone: false
})
export class Step4Component
    implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('snowVideo')
    snowVideo?: ElementRef<HTMLVideoElement>;

    private readonly destroy$ = new Subject<void>();

    private readonly snowVideos: Record<string, string> = {
        powder: 'assets/images/apparence4.webm',
        crud: 'assets/images/apparence4.webm',
        hard: 'assets/images/apparence4.webm'
    };

    type_snow: string | null = null;

    constructor(
        private readonly dataService: DataServiceService,
        private readonly router: Router
    ) {}


    ngOnInit(): void {

        this.dataService.profile$
            .pipe(takeUntil(this.destroy$))
            .subscribe(profile => {

                this.type_snow = profile.typeSnow;

                if (this.type_snow) {
                    this.updateSnowVideo(this.type_snow);
                }

            });

    }


    ngAfterViewInit(): void {

        const initialType = this.type_snow ?? 'powder';

        this.updateSnowVideo(initialType);

    }


    ngOnDestroy(): void {

        this.destroy$.next();
        this.destroy$.complete();

    }


    onSnowTypeChange(value: string): void {

        this.type_snow = value;

        this.dataService.setTypeSnow(value);

        this.updateSnowVideo(value);

    }


    prev(): void {

        this.router.navigate(['/ski/step3']);

    }


    next(): void {

        if (!this.type_snow) {
            return;
        }

        this.router.navigate(['/ski/step5']);

    }


    private updateSnowVideo(type: string): void {

        const video = this.snowVideo?.nativeElement;
        const source = this.snowVideos[type];

        if (!video || !source) {
            return;
        }

        /*
         * La source est déjà chargée.
         * On relance tout de même la vidéo si elle est en pause.
         */
        if (video.src.endsWith(source)) {

            if (video.paused) {
                video.play().catch(() => {
                    // Le navigateur peut empêcher temporairement l'autoplay.
                });
            }

            return;
        }

        video.pause();

        video.src = source;
        video.currentTime = 0;

        video.load();

        video.play().catch(() => {
            // Le navigateur peut empêcher temporairement l'autoplay.
        });

    }

}