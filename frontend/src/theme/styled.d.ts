import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    colors: {
      primary: ColorPalette;
      secondary: ColorPalette;
      tertiary: ColorPalette;
      background: {
        default: string;
        surface: string;
        card: string;
        elevated: string;
      };
      text: {
        primary: string;
        secondary: string;
        muted: string;
        inverse: string;
      };
      border: {
        default: string;
        subtle: string;
        strong: string;
      };
      divider: string;
      state: {
        success: string;
        warning: string;
        error: string;
        info: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    radius: {
      lg: string;
    };
    shadows: {
      sm: string;
      md: string;
    };
  }
}

interface ColorPalette {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}
