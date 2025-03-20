"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [styledComponentsSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    return styledComponentsSheet.getStyleElement();
  });

  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  return <StyleSheetManager sheet={styledComponentsSheet.instance}>{children}</StyleSheetManager>;
}
