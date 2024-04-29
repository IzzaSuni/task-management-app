import { useTheme } from "styled-components";
import { Box, FlexBox, Text } from "../core";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
  const theme = useTheme();

  return (
    <Box background={theme.colors.background}>
      <Sidebar />
      <FlexBox>
        <Header />
        {children}
      </FlexBox>
    </Box>
  );
}
