import { Injectable, Inject} from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { singer } from './data Types/common.type';
import queryString from 'query-string';

interface SingerParams {
  offset: number;
  limit: number;
  cat?: string;
}

const defaultParms: SingerParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
}

@Injectable({
  providedIn: ServiceModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getEnterSinger(args: SingerParams = defaultParms): Observable<singer[]>{
    const params = new HttpParams({ fromString: queryString.stringify(args)});
    return this.http.get(this.url + 'artist/list', { params }).
    pipe(map((res: {artists: singer[]}) => res.artists ));
  }

}
