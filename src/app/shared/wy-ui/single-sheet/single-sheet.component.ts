import { Component, OnInit, Input } from '@angular/core';
import { songSheet } from 'src/app/service/data Types/common.type';

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less']
})
export class SingleSheetComponent implements OnInit {
  @Input() sheet: songSheet;

  constructor() { }

  ngOnInit(): void {
  }

  get coverImg(): string {
    return this.sheet.picUrl || this.sheet.coverImgUrl;
  }

}
