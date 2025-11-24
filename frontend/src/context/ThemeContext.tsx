import { createContext, useMemo, useState, useEffect, type ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface ThemeContextProps {
  mode: "light" | "dark";
  primaryColor: string;
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  mode: "light",
  primaryColor: "#1976d2",
  toggleTheme: () => {},
  setPrimaryColor: () => {},
});

interface Props {
  children: ReactNode;
}

export const CustomThemeProvider = ({ children }: Props) => {

  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("themeMode") as "light" | "dark") || "light"
  );

  const [primaryColor, setPrimaryColor] = useState(
    localStorage.getItem("primaryColor") || "#1976d2"
  );

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("primaryColor", primaryColor);
  }, [primaryColor]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: primaryColor },
        },
      }),
    [mode, primaryColor]
  );

  return (
    <ThemeContext.Provider
      value={{ mode, primaryColor, toggleTheme, setPrimaryColor }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
