import React from "react";
import { Dimensions } from "react-native";
import {
  Skia,
  SkiaView,
  useDrawCallback,
  TileMode,
  vec,
  BlurStyle,
  PaintStyle,
} from "@shopify/react-native-skia";

import { center, c1, c2, rct } from "./Constants";

const { width } = Dimensions.get("window");

const SIZE = width / 2;
const r = SIZE * 0.8;

const paintCircle = Skia.Paint();
paintCircle.setAntiAlias(true);
paintCircle.setShader(
  Skia.Shader.MakeRadialGradient(
    vec(center.x + 25, center.y),
    50,
    [Skia.Color(c1), Skia.Color(c2)],
    null,
    TileMode.Decal
  )
);
paintCircle.setMaskFilter(Skia.MaskFilter.MakeBlur(BlurStyle.Solid, 1, true));

const paint = paintCircle.copy();
paint.setStyle(PaintStyle.Stroke);
paint.setStrokeWidth(18);
paint.setShader(
  Skia.Shader.MakeSweepGradient(
    center.x + 25,
    center.y,
    [Skia.Color(c1), Skia.Color(c2), Skia.Color(c1)],
    null,
    TileMode.Decal
  )
);

export const Demo = () => {
  const onDraw = useDrawCallback((canvas) => {
    canvas.drawColor(0x00000000);
    canvas.drawCircle(center.x, center.y, 25, paintCircle);
    canvas.drawOval(rct, paint);
    canvas.save();
    canvas.rotate(60, center.x, center.y);
    canvas.drawOval(rct, paint);
    canvas.restore();
    canvas.save();
    canvas.rotate(-60, center.x, center.y);
    canvas.drawOval(rct, paint);
    canvas.restore();
  });
  return <SkiaView style={{ flex: 1 }} onDraw={onDraw} />;
};
