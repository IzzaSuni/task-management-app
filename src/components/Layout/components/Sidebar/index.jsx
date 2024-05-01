import { Box, FlexBox, Img, StyledButton, Text } from "@components/core";
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
      width={280}
      background={theme.colors.background}
      borderRight={`1px solid ${theme.colors.border}`}
      height={"100vh"}
      p={theme.spacing.xm}
      position={"absolute"}
      ref={containerRef}
    >
      <StyledButton
        mb={theme.spacing.l}
        alignItems={"center"}
        gap={theme.spacing.l}
        onClick={() => navigate(generatePath(ROUTE))}
      >
        <Img src={VTaskIcon} size={theme.size.xxl} />
        <Text fontWeight={700} fontSize={theme.size.xm}>
          V-Task Manager
        </Text>
      </StyledButton>
      <FlexBox justifyContent={"space-between"}>
        <Text fontWeight={600} mb={theme.spacing.xm}>
          Project List
        </Text>
        <StyledButton position={"relative"} onClick={() => handleShowSidebar()}>
          <UilHorizontalAlignLeft size={theme.size.xm} />
        </StyledButton>
      </FlexBox>

      <ProjectsList />
      <ProjectForm withButton />
    </Box>
  );
}
