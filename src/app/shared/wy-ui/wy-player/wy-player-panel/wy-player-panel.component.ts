import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Song } from 'src/app/service/data Types/common.type';
import { WyScrollComponent } from '../wy-scroll/wy-scroll.component';

@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls: ['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit, OnChanges {
  @Input() songList: Song[];
  @Input() currentIndex: number;
  @Input() currentSong: Song;
  @Input() ListPanelShow: boolean;

  @Output() onChangeSong = new EventEmitter<Song>();
  @Output() onClose = new EventEmitter();

  scrollY = 0;

  @ViewChildren(WyScrollComponent) private wyScroll: QueryList<WyScrollComponent>;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('currentSong:', this.currentSong)
    if (changes['currentSong']){
      if (this.currentSong){
        if (this.ListPanelShow){
          this.scrollToCurrent();
        }
      }
    }

    if (changes['ListPanelShow']){
      if (!changes['ListPanelShow'].firstChange && this.ListPanelShow){
        this.wyScroll.first.refreshScroll();
        this.wyScroll.last.refreshScroll();
      }
    }
  }

  scrollToCurrent(speed = 300){
    const songListRefs = this.wyScroll.first.el.nativeElement.querySelectorAll('ul li');
    const currentLi = songListRefs[this.currentIndex || 0];
    const LiOffsetTop = currentLi.offsetTop;
    console.log('LiOffsetTop:', LiOffsetTop);
    console.log('scrollY:', this.scrollY);
    if((LiOffsetTop - Math.abs(this.scrollY)) > currentLi.offsetHeight * 5 || LiOffsetTop < Math.abs(this.scrollY)){
      this.wyScroll.first.scrollToElement(currentLi, speed, false, false);
    }
  }


}
