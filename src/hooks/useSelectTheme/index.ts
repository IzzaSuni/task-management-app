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
  ThemeSetting.light,
  createJSONStorage(() => localStorage)
);

export default function useSelectTheme() {
  const [themeSetting, setThemeSetting] = useAtom(themeSettingAtom);

  const colors = themes.colors[themeSetting];

  function getSystemTheme() {
    setThemeSetting(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? ThemeSetting.dark
        : ThemeSetting.light
    );
  }

  return {
    themeSetting,
    setThemeSetting,
    getSystemTheme,
    theme: { ...themes, colors },
  };
}
