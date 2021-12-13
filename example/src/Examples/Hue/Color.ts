import {
  mix,
  clamp,
  rgbaColor,
  normalizeRad,
  TAU,
} from "@shopify/react-native-skia";

const quadraticIn = (t: number) => t * t;
const fract = (x: number) => x - Math.floor(x);

const hsv2rgb = (h: number, s: number, v: number) => {
  const K = {
    x: 1,
    y: 2 / 3,
    z: 1 / 3,
    w: 3,
  };
  const p = {
    x: Math.abs(fract(h + K.x) * 6 - K.w),
    y: Math.abs(fract(h + K.y) * 6 - K.w),
    z: Math.abs(fract(h + K.z) * 6 - K.w),
  };
  // return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  const rgb = {
    x: v * mix(s, K.x, clamp(p.x - K.x, 0, 1)),
    y: v * mix(s, K.x, clamp(p.y - K.x, 0, 1)),
    z: v * mix(s, K.x, clamp(p.z - K.x, 0, 1)),
  };

  const r = Math.round(rgb.x * 255);
  const g = Math.round(rgb.y * 255);
  const b = Math.round(rgb.z * 255);
  return { r, g, b };
};

const isLight = (r: number, g: number, b: number) =>
  0.299 * r + 0.587 * g + 0.114 * b > 186;

export const polar2Color = (
  theta: number,
  radius: number,
  maxRadius: number,
  v = 1
) => {
  const h = normalizeRad(theta) / TAU;
  const s = quadraticIn(radius / maxRadius);
  console.log({ h2: h, s2: s });
  const { r, g, b } = hsv2rgb(h, s, v);
  const cl = rgbaColor(r, g, b, 1);
  const light = isLight(r, g, b);
  return { color: cl, light };
};
