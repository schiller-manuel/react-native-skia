import React from "react";
import { Dimensions } from "react-native";
import {
  Skia,
  BlendMode,
  SkiaView,
  useDrawCallback,
} from "@shopify/react-native-skia";

const { width } = Dimensions.get("window");

const SIZE = width / 2;

const paint = Skia.Paint();
paint.setAntiAlias(true);
paint.setBlendMode(BlendMode.Multiply);

export const Demo = () => {
  const r = SIZE * 0.8;
  const onDraw = useDrawCallback((canvas) => {
    // Cyan Circle
    const cyan = paint.copy();
    cyan.setColor(Skia.Color("cyan"));
    canvas.drawCircle(r, r, r, cyan);
    // Magenta Circle
    const magenta = paint.copy();
    magenta.setColor(Skia.Color("magenta"));
    canvas.drawCircle(width - r, r, r, magenta);
    // Yellow Circle
    const yellow = paint.copy();
    yellow.setColor(Skia.Color("yellow"));
    canvas.drawCircle(width / 2, 0, r, yellow);
  });
  return <SkiaView style={{ flex: 1 }} onDraw={onDraw} />;
};
