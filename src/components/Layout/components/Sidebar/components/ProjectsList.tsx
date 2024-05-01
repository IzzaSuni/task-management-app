import {
  Box,
  EllipsisContainer,
  FlexBox,
  StyledButton,
  Text,
} from "@/components/core";
import {
  UilDiceTwo,
  UilEdit,
  UilSuitcase,
  UilTrash,
} from "@iconscout/react-unicons";
import { useTheme } from "styled-components";
import { useAtom } from "jotai";
import { Container } from "./ProjectList.styled";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useSelectTheme from "@/hooks/useSelectTheme";
import { Project, projectsAtom } from "../hooks/useHandleProjectForm";
import { useState } from "react";
import ProjectForm from "./ProjectForm";

type EditProjectTooltipProps = {
  onRename: () => void;
  onDelete: () => void;
};
function EditProjectTooltip({ onRename, onDelete }: EditProjectTooltipProps) {
  const theme = useTheme();
  const { themeSetting } = useSelectTheme();

  return (
    <Tooltip
      openOnClick
      id="edit-project"
      clickable
      place="right"
      variant={themeSetting}
    >
      <Box display={"grid"} gap={theme.spacing.xm}>
        <Container flexDirection={"column"} gap={2}>
          <StyledButton
            py={theme.spacing.s}
            px={theme.spacing.m}
            justifyContent={"space-between"}
            width={"100%"}
            onClick={() => onRename()}
          >
            <Text>Rename</Text>
            <UilEdit size={theme.size.m} />
          </StyledButton>
        </Container>

        <Container flexDirection={"column"} gap={2}>
          <StyledButton
            py={theme.spacing.s}
            px={theme.spacing.m}
            justifyContent={"space-between"}
            width={"100%"}
            gap={theme.spacing.m}
            onClick={() => onDelete()}
          >
            <Text>Delete Project</Text>
            <UilTrash size={theme.size.m} />
          </StyledButton>
        </Container>
      </Box>
    </Tooltip>
  );
}

export default function ProjectsList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>();
  const [isShowFormProject, setIsShowFormProject] = useState(false);

  const [projectsData, setProjectData] = useAtom(projectsAtom);

  const theme = useTheme();
  const navigate = useNavigate();

  const resetSelectedProject = () => setSelectedProject(null);

  console.log(selectedProject, isShowFormProject);

  return (
    <FlexBox flexDirection={"column"} mb={theme.spacing.s}>
      {projectsData?.map((project) => (
        <Container padding={theme.spacing.m} width={"100%"}>
          {selectedProject?.id === project?.id && isShowFormProject ? (
            <ProjectForm
              withButton
              isForceShowForm
              defaultValues={project}
              onSubmitForm={resetSelectedProject}
              onCloseForm={resetSelectedProject}
            />
          ) : (
            <FlexBox
              width={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <EllipsisContainer
                width={"100%"}
                alignItems={"center"}
                gap={theme.spacing.s}
                onClick={(e) => {
                  navigate(`/${project?.project_name}`);
                  resetSelectedProject();
                }}
              >
                <UilSuitcase size={theme.size.m} />
                <Text fontSize={theme.size.s}>{project?.project_name}</Text>
              </EllipsisContainer>
              <StyledButton
                onClick={() => setSelectedProject(project)}
                alignItems={"center"}
                data-tooltip-id="edit-project"
              >
                <UilDiceTwo size={theme.size.m} />
              </StyledButton>
            </FlexBox>
          )}
        </Container>
      ))}
      <EditProjectTooltip
        onRename={() => {
          setIsShowFormProject(true);
        }}
        onDelete={() => {
          setProjectData((projects) => {
            projects.filter((project) => project.id !== selectedProject?.id);

            return projects;
          });
        }}
      />
    </FlexBox>
  );
}
