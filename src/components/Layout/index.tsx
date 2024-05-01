import { useTheme } from "styled-components";
import { Box, FlexBox, Text } from "../core";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ReactNode } from "react";
import { useAtomValue } from "jotai";
import { SidebarShowAtom } from "./components/Sidebar/hooks/useAnimateSidebar";
import { Container } from "./index.styled";
import { useParams } from "react-router-dom";
import { projectsAtom } from "./components/Sidebar/hooks/useHandleProjectForm";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Layout({ children }: { children?: ReactNode }) {
  const isShowSidebar = useAtomValue(SidebarShowAtom);
  const theme = useTheme();

  const params = useParams<{ project_id: string }>();
  const projects = useAtomValue(projectsAtom);

  const selectedProject = projects.find(
    (project) => project.id == params?.project_id
  );

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
            {selectedProject?.project_name}
          </Text>
          {params?.project_id && (
            <Text fontSize={theme.size.s}>
              Created {dayjs(selectedProject?.created_at).fromNow()}
            </Text>
          )}
          {children}
        </Box>
      </FlexBox>
    </Container>
  );
}
