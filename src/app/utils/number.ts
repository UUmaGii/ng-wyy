export function limitNumberInRange(value: number, min: number, max: number){
  return Math.min(Math.max(value, min), max);
}

export function getPercent(min: number, max: number, val: number): number {
  return ((val - min) / (max - min)) * 100;
}

export function getRadomInt(range: [number, number]): number{
  return Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]);
}