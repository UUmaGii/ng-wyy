import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import BScroll from 'better-scroll'

@Component({
  selector: 'app-wy-scroll',
  template: `<div class="wy-scroll" #wrap>
              <ng-content></ng-content>
            </div>`,
  styles: [`.wy-scroll{width:100%;height:100%}`]
})
export class WyScrollComponent implements OnInit, AfterViewInit {
  @Input() refreshDelay = 50;
  @ViewChild('wrap', { static: true }) private wrapRef: ElementRef;

  @Output() private onScrollEnd = new EventEmitter();

  private bs: BScroll;
  constructor(readonly el: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.bs = new BScroll(this.wrapRef.nativeElement,{
      scrollbar: {
        interactive: true
      },
      mouseWheel: {}
    });
    this.bs.on('scrollEnd', ({ y }) => this.onScrollEnd.emit(y) );
  }

  private refresh(){
    this.bs.refresh();
  }

  refreshScroll(){
    setTimeout(() => {
      this.refresh();
    }, this.refreshDelay);
  }

  scrollToElement(...args){
    this.bs.scrollToElement.apply(this.bs, args);
  }
}
