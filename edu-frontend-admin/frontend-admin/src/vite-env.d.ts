/// <reference types="vite/client" />

// src/emotion.d.ts
/** @jsxImportSource @emotion/react */
import "@emotion/react";

declare module "react" {
  interface Attributes {
    css?: import("@emotion/react").CSSObject | import("@emotion/react").SerializedStyles;
  }
}
