import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { WySliderStyle } from './wy-slider-type';

@Component({
  selector: 'app-wy-slider-track',
  template: `<div class="wy-slider-track" [class.buffer] = "wyBuffer" [ngStyle] = "style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderTrackComponent implements OnInit, OnChanges {
  @Input() WyVertical = false;
  @Input() WyLength: number;
  @Input() wyBuffer = false;

  style: WySliderStyle = {}
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.WyVertical){
      this.style.height = this.WyLength + '%';
      this.style.width = null;
      this.style.left = null;
    }else{
      this.style.width = this.WyLength + '%';
      this.style.height = null;
      this.style.bottom = null;
    }
  }

}
