"use client";
import { set } from "date-fns";
import { settings } from "eslint-config-next";
import React from "react";

export const ThemeContext = React.createContext();

function ThemeProvider({ initialTheme="light" }) {
    const [theme, setTheme] = React.useState(initialTheme);
    
    function toggleTheme(){
        if(theme === "light"){
            setTheme("dark");
        } else {
            setTheme("light")
        }
    }

  return <ThemeContext.Provider value={{theme, toggleTheme, setTheme}}>{children}</ThemeContext.Provider>;
}

export function useTheme(){
    const data = React.useContext(ThemeContext);

    if(!data) {
        console.error("Unable to retrieve theme context, did you forget to wrap the elements with the provider?");
        return;
    }
    return data;
}

export default ThemeProvider;
