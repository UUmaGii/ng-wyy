import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Banner, HotTag, songSheet, singer } from 'src/app/service/data Types/common.type';
import { HomeService } from 'src/app/service/home.service';
import { SingerService } from 'src/app/service/singer.service';
import { first } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';

type HomeDataType = [Banner[], HotTag[], songSheet[], singer[]];

@Injectable()
export class HomeResolverService implements Resolve<HomeDataType> {
  constructor(
    private homeServe: HomeService,
    private singerServe: SingerService
  ){}
  resolve(): Observable<HomeDataType> {
    return forkJoin([
      this.homeServe.getBanner(),
      this.homeServe.getHotTags(),
      this.homeServe.getPersonalized(),
      this.singerServe.getEnterSinger()
    ]).pipe(first());
  }
}