"use client";
import React from "react";
import { useTheme } from "./ThemeProvider";
import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

function ThemedHtml({ children, style, ...delegated }) {
  const { theme } = useTheme();
  return (
    <html
      data-color-theme={theme}
      style={{ ...(theme === "light" ? LIGHT_TOKENS : DARK_TOKENS), ...style }}
      {...delegated}
    >
      {children}
    </html>
  );
}

export default ThemedHtml;
