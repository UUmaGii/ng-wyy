import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { Banner } from 'src/app/service/data Types/common.type';
import { NzCarouselComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex  = 0;
  banner: Banner[];

  @ViewChild(NzCarouselComponent, {static: true}) private nzCarousel: NzCarouselComponent;

  constructor(private homeService: HomeService) {
    this.homeService.getBanner().subscribe(banner => {
      this.banner = banner;
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
