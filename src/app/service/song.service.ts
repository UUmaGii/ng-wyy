import { Injectable, Inject} from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, pluck } from 'rxjs/internal/operators';
import { songSheet, Song, SongUrl } from './data Types/common.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: ServiceModule
})
export class SongService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getSongUrl(ids: string): Observable<SongUrl[]>{
    const params = new HttpParams().set('id', ids);
    return this.http.get(this.url + 'song/url', { params })
    .pipe(map((res: { data: SongUrl[] }) => res.data));
  }

  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    const ids = songArr.map(item => item.id).join(',');
    return this.getSongUrl(ids).pipe(map(urls => this.generateSongList(songArr, urls)))
  }

  private generateSongList(songs: Song[], urls: SongUrl[]): Song[]{
    const result = [];
    songs.forEach(song => {
      const url = urls.find(songUrl => songUrl.id === song.id).url;
      if(url){
        result.push({...song, url});
      }
    });
    return result;
  }
}
