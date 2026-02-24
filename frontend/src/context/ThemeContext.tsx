/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { themes } from "../theme/theme";

export const AppThemeContext = createContext({
  mode: "dark",
  toggleTheme: () => {},
});

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <AppThemeContext.Provider value={{ mode, toggleTheme }}>
      <StyledThemeProvider theme={themes[mode]}>{children}</StyledThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const data = useContext(AppThemeContext);

  if (!data) {
    throw new Error("useThemeContext must be used inside AppThemeProvider");
  }

  return data;
};
