import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WyCarouselComponent } from './components/wy-carousel/wy-carousel.component';
import { MemberCardComponent } from './components/member-card/member-card.component';


@NgModule({
  declarations: [HomeComponent, WyCarouselComponent, MemberCardComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
