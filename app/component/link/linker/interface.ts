import { CSSProperties } from "react";

export type LinkerType = "BUTTON" | "ICON";

export interface ImageLinker {
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: CSSProperties;
}
