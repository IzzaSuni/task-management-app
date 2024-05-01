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
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useSelectTheme from "@/hooks/useSelectTheme";
import { Project, projectsAtom } from "../hooks/useHandleProjectForm";
import { useState } from "react";
import ProjectForm from "./ProjectForm";
import { useAnimate } from "framer-motion";

type EditProjectTooltipProps = {
  onRename: () => void;
  onDelete: () => void;
};
function EditProjectTooltip({
  onRename,
  onDelete,
}: Readonly<EditProjectTooltipProps>) {
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
  const [, animate] = useAnimate();
  const theme = useTheme();
  const params = useParams<{ project_name: string }>();
  const navigate = useNavigate();

  const resetSelectedProject = () => {
    setSelectedProject(null);
    setIsShowFormProject(false);
  };

  console.log(projectsData, selectedProject?.id, isShowFormProject);

  return (
    <FlexBox flexDirection={"column"} mb={theme.spacing.s}>
      {projectsData?.map((project) => (
        <Container
          key={project.id}
          padding={theme.spacing.m}
          width={"100%"}
          isActive={params?.project_name === project.project_name}
        >
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
              id={`project-${project.id}`}
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
                <Text fontSize={theme.size.s}>{project?.project_name}a</Text>
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
        onDelete={async () => {
          const deletedComponent = document.getElementById(
            `project-${selectedProject?.id}`
          );

          const deleteIndex = projectsData.findIndex(
            (project) => project.project_name === selectedProject?.project_name
          );

          projectsData.splice(deleteIndex, 1);

          await animate(deletedComponent!, { opacity: 0 }, { duration: 0.3 });
          setProjectData([...projectsData]);
          setSelectedProject(null);
        }}
      />
    </FlexBox>
  );
}
