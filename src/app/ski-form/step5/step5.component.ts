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
    selector: 'app-step5',
    templateUrl: './step5.component.html',
    styleUrls: ['./step5.component.scss'],
    standalone: false
})
export class Step5Component
    implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('turnVideo')
    turnVideo?: ElementRef<HTMLVideoElement>;

    private readonly destroy$ = new Subject<void>();

    private readonly turnVideos: Record<string, string> = {
        short: 'assets/images/apparence5.webm',
        long: 'assets/images/apparence5.webm'
    };

    selectedTurn: string | null = null;

    constructor(
        private readonly dataService: DataServiceService,
        private readonly router: Router
    ) {}


    ngOnInit(): void {

        this.dataService.profile$
            .pipe(takeUntil(this.destroy$))
            .subscribe(profile => {

                this.selectedTurn = profile.turns;

                if (this.selectedTurn) {
                    this.updateTurnVideo(this.selectedTurn);
                }

            });

    }


    ngAfterViewInit(): void {

        const initialTurn = this.selectedTurn ?? 'short';

        this.updateTurnVideo(initialTurn);

    }


    ngOnDestroy(): void {

        this.destroy$.next();
        this.destroy$.complete();

    }


    onTurnChange(value: string): void {

        this.selectedTurn = value;

        this.dataService.setTurns(value);

        this.updateTurnVideo(value);

    }


    prev(): void {

        this.router.navigate(['/ski/step4']);

    }


    next(): void {

        if (!this.selectedTurn) {
            return;
        }

        this.router.navigate(['/ski/step6']);

    }


    private updateTurnVideo(turn: string): void {

        const video = this.turnVideo?.nativeElement;
        const source = this.turnVideos[turn];

        if (!video || !source) {
            return;
        }

        if (video.src.endsWith(source)) {
            return;
        }

        video.pause();

        video.src = source;
        video.currentTime = 0;

        video.load();

        video.play().catch(() => {
            // Le navigateur peut empêcher la lecture automatique.
        });

    }

}