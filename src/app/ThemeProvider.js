"use client";
import Cookies from "js-cookie";
import React from "react";

export const ThemeContext = React.createContext();

function ThemeProvider({ children, initialTheme = "light" }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  React.useEffect(() => {
    Cookies.set("color-theme", theme, {
      expires: 1000,
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const data = React.useContext(ThemeContext);

  if (!data) {
    console.error(
      "Unable to retrieve theme context, did you forget to wrap the elements with the provider?"
    );
    return;
  }
  return data;
}

export default ThemeProvider;
