import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Banner, HotTag, songSheet, singer } from 'src/app/service/data Types/common.type';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { SheetService } from 'src/app/service/sheet.service';

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

  @ViewChild(NzCarouselComponent, {static: true}) private nzCarousel: NzCarouselComponent;

  constructor(
    private route: ActivatedRoute,
    private sheetServe: SheetService
  ) {
    this.route.data.pipe(map(res => res.homeDatas)).subscribe(([banner, hotTags, songSheetList, singers]) => {
      this.banner = banner;
      this.HotTags = hotTags;
      this.songSheet = songSheetList;
      this.enterSinger = singers;
    });
  }

  changeCarousel({to}){
    this.carouselActiveIndex = to;
  }

  changeSlider(slideFunc: string){
    this.nzCarousel[slideFunc]();
  }

  onPlaySheet(id){
    // console.log(e)
    this.sheetServe.playSheet(id).subscribe(list => {
      console.log(list)
    })
  }

  ngOnInit(): void {
  }

}
