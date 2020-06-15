import { Injectable, Inject} from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { Banner } from './data Types/common.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: ServiceModule
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getBanner(): Observable<Banner[]>{
    return this.http.get(this.url + '/banner').
    pipe(map((res: {banners:Banner[]}) => res.banners ))
  }
}
