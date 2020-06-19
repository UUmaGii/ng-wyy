import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { songSheet } from 'src/app/service/data Types/common.type';

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less']
})
export class SingleSheetComponent implements OnInit {
  @Input() sheet: songSheet;
  @Output() onPlay = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  get coverImg(): string {
    return this.sheet.picUrl || this.sheet.coverImgUrl;
  }

  playSheet(evt: MouseEvent, id: number){
    evt.stopPropagation();
    this.onPlay.emit(id);
  }

}
