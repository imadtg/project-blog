import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import { BLOG_TITLE } from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";
import RespectMotionPreferences from "./RespectMotionPrefrences";
import ThemeProvider from "./ThemeProvider";
import ThemedHtml from "./ThemedHtml";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

export const metadata = {
  title: BLOG_TITLE,
  description: "A wonderful blog about JavaScript",
};

function RootLayout({ children }) {
  const theme = "light";

  return (
    <ThemeProvider initialTheme={theme}>
      <RespectMotionPreferences>
        <ThemedHtml
          lang="en"
          className={clsx(mainFont.variable, monoFont.variable)}
        >
          <body>
            <Header theme={theme} />
            <main>{children}</main>
            <Footer />
          </body>
        </ThemedHtml>
      </RespectMotionPreferences>
    </ThemeProvider>
  );
}

export default RootLayout;
