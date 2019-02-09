export function randomIntFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomFromRange(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min;
}

export function radiansToDegrees(radians: number) {
  return radians * 180 / Math.PI;
};

export function degreesToRadians(degrees: number) {
  return degrees * Math.PI / 180;
};