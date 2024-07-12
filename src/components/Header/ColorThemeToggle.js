"use client";
import { useTheme } from "@/app/ThemeProvider";
import { Sun, Moon } from "react-feather";
import VisuallyHidden from "../VisuallyHidden";
import styles from "./Header.module.css";

function ColorThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === "light" ? Sun : Moon;
  return (
    <button className={styles.action} onClick={toggleTheme}>
      <Icon size="1.5rem" />
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default ColorThemeToggle;
