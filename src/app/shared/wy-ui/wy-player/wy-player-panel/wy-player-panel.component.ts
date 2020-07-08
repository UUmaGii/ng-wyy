import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Song } from 'src/app/service/data Types/common.type';
import { WyScrollComponent } from '../wy-scroll/wy-scroll.component';
import { findIndex } from 'src/app/utils/array';

@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls: ['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit, OnChanges {
  @Input() songList: Song[];
  @Input() currentSong: Song;
  @Input() ListPanelShow: boolean;

  @Output() onChangeSong = new EventEmitter<Song>();
  @Output() onClose = new EventEmitter();

  scrollY = 0;
  currentIndex: number;


  @ViewChildren(WyScrollComponent) private wyScroll: QueryList<WyScrollComponent>;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentSong']){
      if (this.currentSong){
        this.currentIndex = findIndex(this.songList, this.currentSong);
        if (this.ListPanelShow){
          this.scrollToCurrent();
        }
      }
    }

    if (changes['ListPanelShow']){
      if (!changes['ListPanelShow'].firstChange && this.ListPanelShow){
        this.wyScroll.first.refreshScroll();
        this.wyScroll.last.refreshScroll();
        if(this.currentSong){
          setTimeout(() => {
            this.scrollToCurrent(0);
          }, 80);
        }
      }
    }
  }

  scrollToCurrent(speed = 300){
    const songListRefs = this.wyScroll.first.el.nativeElement.querySelectorAll('ul li');
    const currentLi = songListRefs[this.currentIndex || 0];
    const LiOffsetTop = currentLi.offsetTop;
    if ((LiOffsetTop - Math.abs(this.scrollY)) > currentLi.offsetHeight * 5 || LiOffsetTop < Math.abs(this.scrollY)){
      this.wyScroll.first.scrollToElement(currentLi, speed, false, false);
    }
  }


}
