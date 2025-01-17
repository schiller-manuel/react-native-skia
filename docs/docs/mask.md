---
id: mask
title: Mask
sidebar_label: Mask
slug: /mask
---

The `Mask` component hides an element by masking the content at specific points.
Just like its [CSS counterpart](https://developer.mozilla.org/en-US/docs/Web/CSS/mask), there are two modes available:
* `alpha`: This mode indicates that the transparency (alpha channel) values of the mask layer image should be used as the mask values. This is how masks work in Figma.
* `luminance`: This mode indicates that the luminance values of the mask layer image should be used as the mask values. This is how masks work in SVG.

The first child of `Mask` is the drawing to be used as a mask, and the remaining children are the drawings to mask.

By default, the mask is not clipped. If you want to clip the mask with the bounds of the content it is masking, use the `bounds` property. 

| Name      | Type                      | Description                                                   |
|:----------|:--------------------------|:--------------------------------------------------------------|
| mode?     | `alpha` or `luminance`    | Is it a luminance or alpha mask (default is `alpha`)          |
| bounds?   | `SkRect`                  | Optional rectangle to clip the mask with                      |
| mask      | `ReactNode[] | ReactNode` | Mask definition | 
| children  | `ReactNode[] | ReactNode` | Content to mask |

## Alpha Mask

Opaque pixels will be visible and transparent pixels invisible.

```tsx twoslash
import {Canvas, Mask, Group, Circle, Rect} from "@shopify/react-native-skia";

const Demo = () => (
  <Canvas style={{ width: 256, height: 256 }}>
    <Mask
      mask={
        <Group>
          <Circle cx={128} cy={128} r={128} opacity={0.5} />
          <Circle cx={128} cy={128} r={64} />
        </Group>
      }
    >
      <Rect x={0} y={0} width={256} height={256} color="lightblue" />
    </Mask>
  </Canvas>
);
```

### Result

![Alpha Mask](assets/mask/alpha.png)

## Luminance Mask

White pixels will be visible and black pixels invisible.

```tsx twoslash
import {Canvas, Mask, Group, Circle, Rect} from "@shopify/react-native-skia";

const Demo = () => (
  <Canvas style={{ width: 256, height: 256 }}>
    <Mask
      mode="luminance"
      mask={
        <Group>
          <Circle cx={128} cy={128} r={128} color="white" />
          <Circle cx={128} cy={128} r={64} color="black" />
        </Group>
      }
    >
      <Rect x={0} y={0} width={256} height={256} color="lightblue" />
    </Mask>
  </Canvas>
);
```

### Result

![Luminance Mask](assets/mask/luminance.png)