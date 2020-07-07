import { Song } from '../service/data Types/common.type';
import { getRadomInt } from './number';

export function inArray(arr: any[], target: any): boolean{
  return arr.indexOf(target) !== -1;
}

export function shuffle<T>(arr: T[]): T[]{
  const result = arr.slice();
  console.log(result.length);
  for( var i = 0; i < result.length; i++){
    const j = getRadomInt([0, i]);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}


export function findIndex(list: Song[], currentSong: Song): number {
  return list.findIndex(item => item.id === currentSong.id);
}