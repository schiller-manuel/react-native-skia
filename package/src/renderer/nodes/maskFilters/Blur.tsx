import { BlurStyle } from "../../../skia/MaskFilter";
import { Skia } from "../../../skia";
import { useDeclaration } from "../Declaration";
import type { SkEnum } from "../processors";
import { enumKey } from "../processors";

export interface BlurProps {
  style: SkEnum<typeof BlurStyle>;
  sigma: number;
}

export const Blur = ({ style, sigma }: BlurProps) => {
  const onDeclare = useDeclaration(() => {
    return Skia.MaskFilter.MakeBlur(BlurStyle[enumKey(style)], sigma, false);
  }, [sigma, style]);
  return <skDeclaration onDeclare={onDeclare} />;
};