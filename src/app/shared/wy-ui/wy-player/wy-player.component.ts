import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from 'src/app/store';
import { getPlayList, getSongList, getCurrentIndex, getPlayer, getCurrentSong, getPlayMode } from 'src/app/store/selectors/player.selector';
import { Song } from 'src/app/service/data Types/common.type';
import { SetCurrentIndex, SetPlayMode, SetPlayList } from 'src/app/store/actions/player.action';
import { Subscription, fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { PlayMode } from './player-type';
import { shuffle, findIndex } from 'src/app/utils/array';

const modeType: PlayMode[] = [{
    type: 'loop',
    label: '单曲循环'
  },
  {
    type: 'random',
    label: '循环'
  },
  {
    type: 'singleLoop',
    label: '随机'
  }
];

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less']
})
export class WyPlayerComponent implements OnInit {
  @ViewChild('audio', {static: true}) private audio: ElementRef;
  private audioEl: HTMLAudioElement;

  songPercent = 0;
  volume = 10;
  bufferOffset = 0;
  currentIndex: number;
  currentSong: Song;
  duration: number;
  currentTime: number;
  playList: Song[];
  songList: Song[];
  isShowVolumePanel = false; // 是否显示音量面板
  playing = false; // 播放状态
  playReady = false; // 是否可播放
  selfClick = false;
  private winClick: Subscription;

  currentMode: PlayMode;
  ModeCount = 0;
  ListPanelShow: false;

  constructor(
    private store$: Store<AppStoreModule>,
    @Inject(DOCUMENT) private doc: Document
  ) {
    const appStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getSongList)).subscribe(list => this.watchList(list, 'songList'));
    appStore$.pipe(select(getPlayList)).subscribe(list => this.watchList(list, 'playList'));
    appStore$.pipe(select(getCurrentIndex)).subscribe(index => this.watchCurrentIndex(index));
    appStore$.pipe(select(getCurrentSong)).subscribe(song => this.watchCurrentSong(song));
    appStore$.pipe(select(getPlayMode)).subscribe(mode => this.watchPlayMode(mode));
  }

  ngOnInit(): void {
    this.audioEl = this.audio.nativeElement;
  }

  private watchList(list: Song[], type: string){
    this[type] = list;
  }

  private watchCurrentIndex(index){
    this.currentIndex = index;
  }

  private watchCurrentSong(song){
    if (song){
      this.currentSong = song;
      this.bufferOffset = 0;
      this.duration = song.dt / 1000;
    }
  }

  private watchPlayMode(mode){
    this.currentMode = mode;
    if (this.songList) {
      let list = this.songList.slice();
      if (mode.type === 'random') {
        list = shuffle(this.songList);
      }
      this.updateCurrentIndex(list, this.currentSong);
      this.store$.dispatch(SetPlayList({ playList: list }));
    }
  }

  updateCurrentIndex(list: Song[], currentSong: Song){
    const newIndex = findIndex(list, currentSong);
    this.store$.dispatch(SetCurrentIndex({ currentIndex: newIndex }));
  }

  onCanPlay(){
    this.playReady = true;
    this.play();
  }

  private play(){
    this.audioEl.volume = this.volume / 100;
    this.audioEl.play();
    this.playing = true;
  }

  get PicUrl(){
    return this.currentSong ? this.currentSong.al.picUrl : 'http://s4.music.126.net/style/web2/img/default/default_album.jpg';
  }

  onTimeUpdate(e: Event){
    this.currentTime = (e.target as HTMLAudioElement).currentTime;
    this.songPercent = (this.currentTime / this.duration) * 100;
    const buffed = this.audioEl.buffered;
    if (buffed.length && this.bufferOffset <= 100){
      this.bufferOffset =  (buffed.end(0) / this.duration) * 100;
    }
  }
  // 上一曲
  onPrev(index){
    if (!this.playReady){return;}
    if(this.playList.length === 0){
      this.loop();
    }
    const newIndex = index < 0 ? this.playList.length - 1 : index ;
    this.updateIndex(newIndex);
  }
  // 播放/暂停
  onToggle(){
    if (this.playReady){
      this.playing = !this.playing;
      if (this.playing){
        this.audioEl.play();
      }else{
        this.audioEl.pause();
      }
    }
  }
  // 下一曲
  onNext(index){
    if (!this.playReady){return;}
    if (this.playList.length === 0){
      this.loop();
    }
    const newIndex = index >= this.playList.length ? 0 : index ;
    this.updateIndex(newIndex);
  }

  onEnd(){
    this.playing = false;
    if(this.currentMode.type === 'singleLoop'){
      this.loop();
    }else{
      this.onNext(this.currentIndex + 1);
    }
  }

  loop(){
    this.currentTime = 0;
    this.audioEl.play();
  }

  updateIndex(index){
    this.store$.dispatch(SetCurrentIndex({ currentIndex: index }));
    this.playReady = false;
  }

  onPercentChange(per: number){
    if (this.currentSong){
      const currentTime = this.duration * (per / 100);
      this.audioEl.currentTime = currentTime;
    }
  }

  // 改变音量
  onVolumeChange(per: number){
    this.audioEl.volume = per / 100;
  }
  toggleVolPanel(evt: Event){
    this.isShowPanel('isShowVolumePanel');
  }

  showLylicPanel(){
    this.isShowPanel('ListPanelShow');
  }

  isShowPanel(type: string){
    this[type] = !this[type];
    if (this[type]){
      this.bindDocumentClickListen();
    }else{
      this.unbindDocumentClickListen();
    }
  }

  bindDocumentClickListen(){
    if (!this.winClick){
      this.winClick = fromEvent(this.doc, 'click').subscribe(() => {
        if (!this.selfClick){
          this.isShowVolumePanel = false;
          this.ListPanelShow = false;
          this.unbindDocumentClickListen();
        }
        this.selfClick = false;
      });
    }
  }
  unbindDocumentClickListen(){
    if (this.winClick){
      this.winClick.unsubscribe();
      this.winClick = null;
    }
  }

  changeMode(){
    this.store$.dispatch(SetPlayMode({playMode: modeType[++this.ModeCount % 3]}));
  }

  onChangeSong(song){
    this.updateCurrentIndex(this.playList, song);
  }
}
