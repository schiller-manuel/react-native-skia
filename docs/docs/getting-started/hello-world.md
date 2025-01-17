---
id: hello-world
title: Hello World
sidebar_label: Hello World
slug: /getting-started/hello-world
---

React Native Skia has two APIs: a declarative API available as a React Native Renderer and an imperative API backed by JSI.
The recommended way to use this library is via the declarative API.
Library developers may take advantage of the imperative API to provide custom features.

## Declarative API

### Example

```tsx twoslash
import {Canvas, Circle, Group} from "@shopify/react-native-skia";

export const HelloWorld = () => {
  const width = 256;
  const height = 256;
  const r = 215;
  return (
    <Canvas style={{ flex: 1 }}>
      <Group blendMode="multiply">
        <Circle cx={r} cy={r} r={r} color="cyan" />
        <Circle cx={width - r} cy={r} r={r} color="magenta" />
        <Circle
          cx={width/2}
          cy={height - r}
          r={r}
          color="yellow"
        />
      </Group>
    </Canvas>
  );
};
```

### Result

![Hello World](assets/helloworld.png)

## Imperative API

### Example

```tsx twoslash
import {Skia, BlendMode, SkiaView, useDrawCallback} from "@shopify/react-native-skia";

const paint = Skia.Paint();
paint.setAntiAlias(true);
paint.setBlendMode(BlendMode.Multiply);

export const HelloWorld = () => {
  const width = 256;
  const height = 256;
  const r = 215;
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
    canvas.drawCircle(width/2, height - r, r, yellow);
  });
  return (
    <SkiaView style={{ flex: 1 }} onDraw={onDraw} />
  );
};
```

### Result

![Hello World](assets/helloworld.png)