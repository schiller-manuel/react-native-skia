import React, { useMemo, useRef } from "react";
import { Button, StyleSheet, View, Dimensions } from "react-native";
import type { IPath } from "@shopify/react-native-skia";
import {
  useImage,
  Skia,
  usePaint,
  useDrawCallback,
  useTouchHandler,
  PaintStyle,
  StrokeCap,
  SkiaView,
} from "@shopify/react-native-skia";
import { fitRects } from "@shopify/react-native-skia/src/renderer/components/image/BoxFit";

type Point = { x: number; y: number };

const { width, height } = Dimensions.get("window");
const paint = Skia.Paint();

export const DrawingExample: React.FC = () => {
  const oslo = useImage(require("../../assets/oslo.jpg"));
  const prevPointRef = useRef<Point>();

  const pathPaint = usePaint((p) => {
    p.setColor(Skia.Color("#7F33A9"));
    p.setStrokeWidth(5);
    p.setStyle(PaintStyle.Stroke);
    p.setStrokeCap(StrokeCap.Round);
  });

  const paths = useMemo(() => [] as IPath[], []);

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      const path = Skia.Path.Make();
      paths.push(path);
      path.moveTo(x, y);
      prevPointRef.current = { x, y };
    },
    onActive: ({ x, y }) => {
      // Get current path object
      const path = paths[paths.length - 1];

      // Calculate and draw a smooth curve
      const xMid = (prevPointRef.current!.x + x) / 2;
      const yMid = (prevPointRef.current!.y + y) / 2;

      path.quadTo(prevPointRef.current!.x, prevPointRef.current!.y, xMid, yMid);

      prevPointRef.current = { x, y };
    },
  });

  const onDraw = useDrawCallback(
    (canvas, info) => {
      // Update from pending touches
      touchHandler(info.touches);

      // Clear screen
      if (oslo) {
        const rects = fitRects("cover", oslo, { x: 0, y: 0, width, height });
        canvas.drawImageRect(oslo, rects.src, rects.dst, paint);
      }

      // Draw paths
      if (paths.length > 0) {
        for (let i = 0; i < paths.length; i++) {
          canvas.drawPath(paths[i], pathPaint);
        }
      }
    },
    [pathPaint, paths]
  );

  const skiaViewRef = useRef<SkiaView>(null);

  return (
    <>
      <SkiaView
        ref={skiaViewRef}
        style={styles.skiaview}
        onDraw={onDraw}
        debug
      />
      <View style={styles.buttons}>
        <Button
          title="Clear"
          onPress={() => {
            paths.length = 0;
            skiaViewRef.current?.redraw();
          }}
        />
        <Button
          title="Undo"
          onPress={() => {
            paths.length = Math.max(0, paths.length - 1);
            skiaViewRef.current?.redraw();
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  skiaview: {
    width: "100%",
    flex: 1,
    overflow: "hidden",
  },
  buttons: {
    flexDirection: "row",
    paddingBottom: 24,
    paddingHorizontal: 14,
  },
});
