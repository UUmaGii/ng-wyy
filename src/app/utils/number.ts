export function limitNumberInRange(value: number, min: number, max: number){
  return Math.min(Math.max(value, min), max);
}

export function getPercent(min: number, max: number, val: number): number {
  return ((val - min) / (max - min)) * 100;
}