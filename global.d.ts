import "styled-components";
import { CSSProp } from "styled-components";
import { DefaultTheme } from "styled-components/native";

type ThemeType = {
  colors: {
    background: string;
    primary: string;
    secondary: string;
    border: string;
    text: string;
  };
  size: {
    xxs: number;
    xs: number;
    s: number;
    m: number;
    xm: number;
    l: number;
    xl: number;
  };
  spacing: {
    s: number;
    m: number;
    xm: number;
    l: number;
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
