import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyPlayerComponent } from './wy-player.component';
import { WySliderModule } from '../wy-slider/wy-slider.module';
import { FormsModule } from '@angular/forms';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { WyPlayerPanelComponent } from './wy-player-panel/wy-player-panel.component';



@NgModule({
  declarations: [WyPlayerComponent, TimeFormatPipe, WyPlayerPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    WySliderModule
  ],
  exports: [
    WyPlayerComponent
  ]
})
export class WyPlayerModule { }
