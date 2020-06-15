import { Component, OnInit, TemplateRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less']
})
export class WyCarouselComponent implements OnInit {
  @Output() changeSlide = new EventEmitter();
  @Input() activeIndex = 0;
  @ViewChild('dot', {static: true}) dotRef: TemplateRef<any>;
  constructor() { }

  onHandleSlide(type){
    this.changeSlide.emit(type);
  }
  ngOnInit(): void {
  }

}
