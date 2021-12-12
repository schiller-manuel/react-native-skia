import {
  BlurMask,
  Canvas,
  Circle,
  Fill,
  Group,
  Oval,
  Paint,
  RadialGradient,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia";
import React from "react";

import { center, c1, c2, rct } from "./Constants";

export const Demo = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      <Paint>
        <RadialGradient
          r={50}
          c={vec(center.x + 25, center.y)}
          colors={[c1, c2]}
        />
        <BlurMask sigma={20} style="solid" />
      </Paint>
      <Circle c={center} r={25} />
      <Paint>
        <SweepGradient colors={[c1, c2, c1]} c={center} />
        <BlurMask sigma={20} style="solid" />
      </Paint>
      <Group style="stroke" strokeWidth={18}>
        <Oval rect={rct} />
        <Group
          origin={center}
          transform={[{ rotate: Math.PI / 3 }, { scale: -1 }]}
        >
          <Oval rect={rct} />
        </Group>
        <Group
          origin={center}
          transform={[{ rotate: -Math.PI / 3 }, { scale: -1 }]}
        >
          <Oval rect={rct} />
        </Group>
      </Group>
    </Canvas>
  );
};
