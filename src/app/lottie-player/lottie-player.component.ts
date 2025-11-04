import { Component, ElementRef, EventEmitter, Input, OnDestroy, AfterViewInit, Output, ViewChild } from '@angular/core';
import lottie, { AnimationItem } from 'lottie-web';

@ Component({
    selector: 'app-lottie-player',
    template: '<div #container style="width:100%;height:100%"></div>',
    standalone: false
})
export class LottiePlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @Input() options: any;
  @Output() animationCreated = new EventEmitter<AnimationItem>();

  private animationItem?: AnimationItem;

  ngAfterViewInit(): void {
    if (!this.options || !this.options.path) {
      return;
    }
    this.animationItem = lottie.loadAnimation({
      container: this.containerRef.nativeElement,
      renderer: 'svg',
      loop: this.options.loop ?? false,
      autoplay: this.options.autoplay ?? false,
      path: this.options.path
    });
    this.animationCreated.emit(this.animationItem);
  }

  ngOnDestroy(): void {
    if (this.animationItem) {
      this.animationItem.destroy();
    }
  }
}


