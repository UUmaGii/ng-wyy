import { Lyric } from 'src/app/service/data Types/common.type';

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
  private generTlyric(){}

  private makeLines(lines){
    const result = timeExp.exec(lines);
    // 如果歌词中包含了时间
    if (result){
      const txt = lines.replace(timeExp, '').trim();
      const txtCn = '';
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