import { Box, FlexBox, Img, Button, Text } from "@components/core";
import { useTheme } from "styled-components";
import VTaskIcon from "@assets/v-task-logo.svg";
import ProjectForm from "./components/ProjectForm";
import ProjectsList from "./components/ProjectsList";
import { UilHorizontalAlignLeft } from "@iconscout/react-unicons";
import useAnimateSidebar from "./hooks/useAnimateSidebar";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTE } from "@/constant/routes";

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { handleShowSidebar, containerRef } = useAnimateSidebar();

  return (
    <Box
      zIndex={99999}
      width={280}
      background={theme.colors.background}
      borderRight={`1px solid ${theme.colors.border}`}
      height={"100vh"}
      p={theme.spacing.xm}
      position={"absolute"}
      ref={containerRef}
    >
      <Button
        mb={theme.spacing.l}
        alignItems={"center"}
        gap={theme.spacing.l}
        onClick={() => navigate(generatePath(ROUTE))}
      >
        <Img src={VTaskIcon} size={theme.size.xxl} />
        <Text fontWeight={700} fontSize={theme.size.xm}>
          V-Task Manager
        </Text>
      </Button>
      <FlexBox justifyContent={"space-between"}>
        <Text fontWeight={600} mb={theme.spacing.xm}>
          Project List
        </Text>
        <Button
          position={"relative"}
          onClick={() => handleShowSidebar()}
          gap={theme.spacing.m}
        >
          <Text>hide </Text>
          <UilHorizontalAlignLeft size={theme.size.xm} />
        </Button>
      </FlexBox>

      <ProjectsList />
      <ProjectForm />
    </Box>
  );
}
