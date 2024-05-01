import { useTheme } from "styled-components";
import { Box, FlexBox, Text } from "../core";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ReactNode } from "react";
import { useAtomValue } from "jotai";
import { SidebarShowAtom } from "./components/Sidebar/hooks/useAnimateSidebar";
import { Container } from "./index.styled";
import { useParams } from "react-router-dom";

export default function Layout({ children }: { children?: ReactNode }) {
  const isShowSidebar = useAtomValue(SidebarShowAtom);
  const theme = useTheme();

  const params = useParams<{ project_name: string }>();

  return (
    <Container background={theme.colors.background} position={"relative"}>
      <Sidebar />
      <FlexBox
        className="main-content-wrapper"
        marginLeft={isShowSidebar ? 280 : 0}
        flexDirection={"column"}
        width={"100%"}
      >
        <Header />
        <Box
          p={theme.spacing.xl}
          pt={theme.spacing.m}
          height={"calc(100vh - 60px)"}
          overflow={"auto"}
          mb={theme.spacing.l}
        >
          <Text fontSize={theme.size.xxxl} fontWeight={800}>
            {params?.project_name}
          </Text>
          {children}
        </Box>
      </FlexBox>
    </Container>
  );
}
