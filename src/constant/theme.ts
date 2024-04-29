import { ThemeSetting } from "@/hooks/useSelectTheme";

export const theme = {
  colors: {
    dark: {
      background: "#3E3232",
      primary: "#503C3C",
      secondary: "#7E6363",
      border: "#A87C7C",
      text: "#F6F5F2",
    },
    light: {
      background: "#F5EEE6",
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
    xm: 18,
    l: 20,
    xl: 24,
  },
  spacing: {
    s: 4,
    m: 8,
    xm: 16,
    l: 32,
  },
  breakpoints: ["640px", "768px", "1024px"],
};
