import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Banner, HotTag, songSheet, singer } from 'src/app/service/data Types/common.type';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { SheetService } from 'src/app/service/sheet.service';
import { AppStoreModule } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { SetPlayList, SetSongList, SetCurrentIndex } from 'src/app/store/actions/player.action';
import { getPlayer, getPlayMode } from 'src/app/store/selectors/player.selector';
import { PlayState } from 'src/app/store/reducers/player.reducer';
import { shuffle, findIndex } from 'src/app/utils/array';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex  = 0;
  banner: Banner[];
  HotTags: HotTag[];
  songSheet: songSheet[];
  enterSinger: singer[];

  playState: PlayState;

  @ViewChild(NzCarouselComponent, {static: true}) private nzCarousel: NzCarouselComponent;

  constructor(
    private route: ActivatedRoute,
    private sheetServe: SheetService,
    private store$: Store<AppStoreModule>
  ) {
    this.route.data.pipe(map(res => res.homeDatas)).subscribe(([banner, hotTags, songSheetList, singers]) => {
      this.banner = banner;
      this.HotTags = hotTags;
      this.songSheet = songSheetList;
      this.enterSinger = singers;
    });

    this.store$.pipe(select(getPlayer)).subscribe(res => this.playState = res);
  }

  changeCarousel({to}){
    this.carouselActiveIndex = to;
  }

  changeSlider(slideFunc: string){
    this.nzCarousel[slideFunc]();
  }

  onPlaySheet(id){
    this.sheetServe.playSheet(id).subscribe(list => {
      this.store$.dispatch(SetPlayList({ playList: list }));

      let trueIndex = 0;
      let trueList = list.slice();

      if (this.playState.playMode.type === 'random'){
        trueList = shuffle(trueList);
        trueIndex = findIndex(trueList, list[trueIndex]);
      }
      this.store$.dispatch(SetSongList({ songList: trueList })),
      this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));
    });
  }

  ngOnInit(): void {
  }

}
