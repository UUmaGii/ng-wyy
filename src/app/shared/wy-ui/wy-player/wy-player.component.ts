import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from 'src/app/store';
import { getPlayList, getSongList, getCurrentIndex, getPlayer, getCurrentSong, getPlayMode } from 'src/app/store/selectors/player.selector';
import { Song } from 'src/app/service/data Types/common.type';
import { SetCurrentIndex } from 'src/app/store/actions/player.action';

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

  playing = false; // 播放状态
  playReady = false; // 是否可播放

  constructor(
    private store$: Store<AppStoreModule>
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
    // console.log(type, list);
    this[type] = list;
  }

  private watchCurrentIndex(index){
    this.currentIndex = index;
  }

  private watchCurrentSong(song){
    if (song){
      this.currentSong = song;
      console.log('song:', song);
      this.duration = song.dt / 1000;
    }
  }

  private watchPlayMode(mode){
    console.log('mode:', mode);
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
    const buffed = this.audioEl.buffered;
    if (buffed.length && this.bufferOffset <= 100){
      this.bufferOffset =  (buffed.end(0) / this.duration) * 100;
    }
  }

  onPrev(index){
    if (!this.playReady){return;}
    if(this.playList.length === 0){
      this.loop();
    }
    const newIndex = index < 0 ? this.playList.length : index ;
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
  onNext(index){
    if (!this.playReady){return;}
    if(this.playList.length === 0){
      this.loop();
    }
    const newIndex = index >= this.playList.length ? 0 : index ;
    this.updateIndex(newIndex);
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
      this.currentTime = this.duration * (per / 100);
      this.audioEl.currentTime = this.currentTime;
    }
  }

  // 改变音量
  onVolumeChange(per: number){
    this.audioEl.volume = per / 100;
  }
}
