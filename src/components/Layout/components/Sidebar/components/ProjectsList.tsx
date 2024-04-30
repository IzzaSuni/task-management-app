import { EllipsisContainer, FlexBox, Text } from "@/components/core";
import { UilEdit, UilSuitcase } from "@iconscout/react-unicons";
import { useTheme } from "styled-components";
import { projectsAtom } from "../hooks/useCreateProject";
import { useAtomValue } from "jotai";
import { Container } from "./ProjectList.styled";
import { useNavigate } from "react-router-dom";

export default function ProjectsList() {
  const projectsData = useAtomValue(projectsAtom);
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <FlexBox flexDirection={"column"} mb={theme.spacing.s}>
      {projectsData?.map(({ project_name }) => (
        <Container
          onClick={(e) => navigate(`/${project_name}`)}
          padding={theme.spacing.m}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <EllipsisContainer alignItems={"center"} gap={theme.spacing.s}>
            <UilSuitcase size={theme.size.m} />
            <Text fontSize={theme.size.s}>{project_name}</Text>
          </EllipsisContainer>
          <FlexBox alignItems={"center"}>
            <UilEdit size={theme.size.m} />
          </FlexBox>
        </Container>
      ))}
    </FlexBox>
  );
}
