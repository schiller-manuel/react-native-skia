import { rect, vec } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");
export const center = vec(width / 2, height / 2);
export const c1 = "#3884FF";
export const c2 = "#51D6ED";
const aspectRatio = 180 / 470;
const w = width * 0.8;
const h = w * aspectRatio;
export const rct = rect((width - w) / 2, center.y - h / 2, w, h);
