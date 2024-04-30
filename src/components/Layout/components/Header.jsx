import { FlexBox, StyledButton, Text } from "@/components/core";
import useSelectTheme, { ThemeSetting } from "@/hooks/useSelectTheme";
import { UilMoon, UilSun } from "@iconscout/react-unicons";
import { useTheme } from "styled-components";

export default function Header() {
  const theme = useTheme();
  const { setThemeSetting, themeSetting } = useSelectTheme();

  const AppereanceLogo = themeSetting === ThemeSetting.light ? UilMoon : UilSun;

  return (
    <FlexBox
      padding={2}
      width={"100%"}
      justifyContent={"right"}
      height={"60px"}
    >
      <FlexBox alignItems={"center"} gap={theme.spacing.s}>
        <Text fontSize={theme.size.s}>Apperance</Text>
        <StyledButton
          onClick={() =>
            setThemeSetting((themeSetting) =>
              themeSetting === ThemeSetting.dark
                ? ThemeSetting.light
                : ThemeSetting.dark
            )
          }
        >
          <AppereanceLogo />
        </StyledButton>
      </FlexBox>
    </FlexBox>
  );
}
