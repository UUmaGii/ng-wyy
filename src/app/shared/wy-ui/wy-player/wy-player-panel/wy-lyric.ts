import { Lyric } from 'src/app/service/data Types/common.type';
import { zip } from 'rxjs/internal/observable/zip';
import { from } from 'rxjs';
import { skip } from 'rxjs/internal/operators';

const timeExp = /\[(\d{2}):(\d{2}).(\d{2,3})\]/;

export interface BaseLyricLine {
  txt: string,
  txtCn: string
}

interface LyricLine extends BaseLyricLine{
  timer: number
}

export class WyLyric{
  lines: LyricLine[] = [];
  lrc: Lyric;

  constructor(lrc: Lyric){
    this.lrc = lrc;
    this.init();
  }

  private init(){
    // 如果是有翻译的歌曲
    if (this.lrc.tlyric){
      this.generTlyric();
    }else{
      this.generlyric();
    }
  }

  private generlyric(){
    const lines = this.lrc.lyric.split('\n');
    lines.forEach(line =>  this.makeLines(line));
  }
  private generTlyric(){
    const lines = this.lrc.lyric.split('\n');
    const tlines = this.lrc.tlyric.split('\n').filter(item => timeExp.exec(item));

    const moreLine = lines.length - tlines.length;
    let tempArr;
    if (moreLine >= 0){
      tempArr = [lines, tlines];
    }else{
      tempArr = [tlines, lines];
    }

    const first = timeExp.exec(tempArr[1][0])[0]; // 找最短的歌词
    const skipIndex = tempArr[0].findIndex(item => {
      const exec = timeExp.exec(item);
      if (exec){
        return exec[0] === first;
      }
    });
    const _skip = skipIndex === -1 ? 0 : skipIndex;
    // 过滤多的歌词中的部分
    const skipItems = tempArr[0].slice(0, _skip);
    if (skipItems.length > 0){
      skipItems.forEach(skipItem => {
        this.makeLines(skipItem);
      });
    }

    let zipLines$;
    if (moreLine > 0){
      zipLines$ = zip(from(lines).pipe(skip(_skip)), from(tlines));
    }else{
      zipLines$ = zip(from(lines), from(tlines).pipe(skip(_skip)));
    }

    zipLines$.subscribe(([lines, tlines]) => {
      this.makeLines(lines, tlines);
    });
  }

  private makeLines(lines: string, tlines: string = ''){
    const result = timeExp.exec(lines);
    // 如果歌词中包含了时间
    if (result){
      const txt = lines.replace(timeExp, '').trim();
      const txtCn = tlines ? tlines.replace(timeExp, '').trim() : '';
      if (txt){
        const thirdResult = result[3] || '00';
        const len = thirdResult.length;
        const _thirdResult = len > 2 ? parseInt(thirdResult) : parseInt(thirdResult) * 10;
        const timer = Number(result[1]) * 60 * 1000 + Number(result[2]) * 1000 + _thirdResult;
        this.lines.push({txt, txtCn, timer});
      }
    }
  }
}