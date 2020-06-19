import { Injectable, Inject} from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, pluck, switchMap } from 'rxjs/internal/operators';
import { songSheet, Song } from './data Types/common.type';
import { Observable } from 'rxjs';
import { SongService } from './song.service';

@Injectable({
  providedIn: ServiceModule
})
export class SheetService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private url: string,
    private songServe: SongService
  ) { }

  // 获取歌单列表
  getSheet(): Observable<songSheet[]>{
    return this.http.get(this.url + 'top/playlist').
    pipe(map((res: {banners:songSheet[]}) => res.banners ))
  }

 // 获取歌单详情
 getSongSheetDetail(id: number): Observable<songSheet> {
  const params = new HttpParams().set('id', id.toString());
  return this.http.get(this.url + 'playlist/detail', { params })
  .pipe(map((res: { playlist: songSheet }) => res.playlist));
}

  playSheet(id: number): Observable<Song[]> {
    return this.getSongSheetDetail(id)
    .pipe(pluck('tracks'), switchMap(tracks => this.songServe.getSongList(tracks)));
  }
}
