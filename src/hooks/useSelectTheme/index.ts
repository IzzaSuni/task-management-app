import { KEY_STORAGE } from "@/constant/storageKey";
import { theme as themes } from "@/constant/theme";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export enum ThemeSetting {
  "dark" = "dark",
  "light" = "light",
}

export const themeSettingAtom = atomWithStorage<ThemeSetting>(
  KEY_STORAGE.THEME_PREFER,

  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ThemeSetting.dark
    : ThemeSetting.light,
  createJSONStorage(() => localStorage)
);

export default function useSelectTheme() {
  const [themeSetting, setThemeSetting] = useAtom(themeSettingAtom);

  const colors = {
    ...themes.colors[themeSetting],
    gray: {
      100: "#F7FAFC",
      200: "#EDF2F7",
      300: "#E2E8F0",
      400: "#CBD5E0",
      500: "#A0AEC0",
      600: "#718096",
      700: "#4A5568",
      800: "#2D3748",
      900: "#1A202C",
    },
  };

  return {
    themeSetting,
    setThemeSetting,
    theme: { ...themes, colors },
  };
}
