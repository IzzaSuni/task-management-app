import { ThemeSetting } from "@/hooks/useSelectTheme";

export const theme = {
  colors: {
    dark: {
      background: "#3E3232",
      backgroundFaded: "#F5EEE61a",
      primary: "#503C3C",
      secondary: "#7E6363",
      border: "#A87C7C",
      text: "#F6F5F2",
    },
    light: {
      background: "#F5EEE6",
      backgroundFaded: "#3E32321a",
      primary: "#FFF8E3",
      secondary: "#F3D7CA",
      border: "#E6A4B4",
      text: "#0C0C0C",
    },
  },
  size: {
    xxs: 10,
    xs: 12,
    s: 14,
    m: 16,
    xm: 20,
    l: 24,
    xl: 28,
    xxl: 32,
    xxxl: 40,
  },
  spacing: {
    s: 1,
    m: 2,
    xm: 3,
    l: 4,
    xl: 6,
  },
  breakpoints: ["640px", "768px", "1024px"],
};
