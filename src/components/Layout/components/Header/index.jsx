import { FlexBox, Button, Text } from "@/components/core";
import useSelectTheme, { ThemeSetting } from "@/hooks/useSelectTheme";
import { UilDownloadAlt, UilMoon, UilSun } from "@iconscout/react-unicons";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

export default function Header() {
  const [installPWAPrompt, setPrompt] = useState();
  const [isInstalled, setIsInstalled] = useState(false);

  const theme = useTheme();
  const { setThemeSetting, themeSetting } = useSelectTheme();

  const AppereanceLogo = themeSetting === ThemeSetting.light ? UilMoon : UilSun;

  const handleInstall = () => {
    installPWAPrompt.prompt();
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setPrompt(e);
    });

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
  }, [window]);

  return (
    <FlexBox
      padding={2}
      width={"100%"}
      justifyContent={"right"}
      alignItems={"center"}
      height={"60px"}
    >
      {!isInstalled && (
        <FlexBox
          id="install"
          alignItems={"center"}
          borderRight={`1px solid ${theme.colors.border}`}
          pr={theme.spacing.m}
        >
          <Button
            gap={theme.spacing.m}
            onClick={(event) => {
              handleInstall(event);
            }}
          >
            <Text>Install</Text>
            <UilDownloadAlt size={theme.size.s} />
          </Button>
        </FlexBox>
      )}

      <FlexBox ml={theme.spacing.m} alignItems={"center"} gap={theme.spacing.s}>
        <Text fontSize={theme.size.s}>Appereance</Text>
        <Button
          onClick={() =>
            setThemeSetting((themeSetting) =>
              themeSetting === ThemeSetting.dark
                ? ThemeSetting.light
                : ThemeSetting.dark
            )
          }
        >
          <AppereanceLogo />
        </Button>
      </FlexBox>
    </FlexBox>
  );
}
