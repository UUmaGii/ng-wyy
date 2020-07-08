import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Song } from 'src/app/service/data Types/common.type';

@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls: ['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit, OnChanges {
  @Input() songList: Song[];
  @Input() currentIndex: number;
  @Input() ListPanelShow: boolean;

  @Output() onChangeSong = new EventEmitter<Song>();
  @Output() onClose = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('songList:', this.songList);
    // console.log('currentIndex:', this.currentIndex);
  }

  changeCurrentSong(){}

}
