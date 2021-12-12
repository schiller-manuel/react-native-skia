export const { PI } = Math;
export const TAU = PI * 2;

export const mix = (value: number, x: number, y: number) =>
  x * (1 - value) + y * value;

export const bin = (value: boolean) => (value ? 1 : 0);

export const clamp = (value: number, lowerBound: number, upperBound: number) =>
  Math.min(Math.max(lowerBound, value), upperBound);

export const normalizeRad = (value: number) => {
  const rest = value % TAU;
  return rest > 0 ? rest : TAU + rest;
};
