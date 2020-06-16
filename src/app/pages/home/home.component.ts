import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { Banner, HotTag, songSheet } from 'src/app/service/data Types/common.type';
import { NzCarouselComponent } from 'ng-zorro-antd';

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

  @ViewChild(NzCarouselComponent, {static: true}) private nzCarousel: NzCarouselComponent;

  constructor(private homeService: HomeService) {
    this.getBanner()
    this.getHotTags()
    this.getPersonalized()
  }
  
  getBanner(){
    this.homeService.getBanner().subscribe(banner => {
      this.banner = banner;
    })
  }

  getHotTags(){
    this.homeService.getHotTags().subscribe(tags => {
      this.HotTags = tags
    })
  }

  getPersonalized(){
    this.homeService.getPersonalized().subscribe(result => {
      this.songSheet = result
    })
  }

  changeCarousel({to}){
    this.carouselActiveIndex = to;
  }

  changeSlider(slideFunc: string){
    this.nzCarousel[slideFunc]();
  }

  ngOnInit(): void {
  }

}
