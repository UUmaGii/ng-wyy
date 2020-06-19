import { Injectable, Inject} from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { Banner, HotTag, songSheet } from './data Types/common.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { HashLocationStrategy } from '@angular/common';

@Injectable({
  providedIn: ServiceModule
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getBanner(): Observable<Banner[]>{
    return this.http.get(this.url + 'banner').
    pipe(map((res: {banners:Banner[]}) => res.banners ))
  }

  getHotTags(): Observable<HotTag[]>{
    return this.http.get(this.url + 'playlist/hot').
    pipe(map((res: {tags: HotTag[]}) => {
      return res.tags.sort((x: HotTag, y: HotTag) => x.position - y.position).splice(0, 5);
    }));
  }

  getPersonalized(): Observable<songSheet[]>{
    return this.http.get(this.url + 'personalized').
    pipe(map((res: {result: songSheet[]}) => res.result.slice(0, 16)));
  }
}
