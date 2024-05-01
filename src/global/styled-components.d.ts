import "styled-components";
import { CSSProp } from "styled-components";
import { DefaultTheme } from "styled-components/native";

type ThemeType = {
  colors: {
    background: string;
    backgroundFaded: string;
    primary: string;
    secondary: string;
    border: string;
    text: string;
    gray: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  };
  size: {
    xxs: number;
    xs: number;
    s: number;
    m: number;
    xm: number;
    l: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  spacing: {
    s: number;
    m: number;
    xm: number;
    l: number;
    xl: number;
  };
  breakpoints: [string, string, number];
};

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}

declare module "react" {
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}
