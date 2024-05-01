import { ROUTE } from "@/constant/routes";
import { KEY_STORAGE } from "@/constant/storageKey";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import { SubmitHandler, useForm } from "react-hook-form";
import { generatePath, useNavigate } from "react-router-dom";

export type Project = {
  id?: number | string;
  project_name: string;
};

export const projectsAtom = atomWithStorage<Project[]>(
  KEY_STORAGE.PROJECTS_DATA,
  [],
  createJSONStorage(() => localStorage)
);

export default function useHandleProjectForm(props?: Project) {
  const [project, setProjects] = useAtom(projectsAtom);
  const navigate = useNavigate();

  const {
    control,
    trigger,
    handleSubmit: validateSubmit,
    reset,
  } = useForm<Project>({
    defaultValues: { project_name: props?.project_name },
  });

  const handleDuplicatedProjectName = (value: Project) => {
    const isDuplicated = !!project?.find(
      (project) => project?.project_name === value.project_name
    )?.id;

    return { isDuplicated };
  };

  const handleSubmitProject: SubmitHandler<Project> = (value) => {
    const { isDuplicated } = handleDuplicatedProjectName(value);

    if (isDuplicated) {
      reset();
      return navigate(
        generatePath(ROUTE, { project_name: value?.project_name })
      );
    }

    if (props?.project_name) {
      return setProjects((projects) => {
        const projectIndex = projects.findIndex(
          (project) => project.id == props?.id
        );

        if (projectIndex >= 0) {
          projects[projectIndex] = {
            id: props.id,
            project_name: value.project_name,
          };
        }

        return projects;
      });
    }

    setProjects((projects) => [
      ...projects,
      { ...value, id: projects.length ? projects.length + 1 : 1 },
    ]);

    navigate(generatePath(ROUTE, { project_name: value?.project_name }));
    reset();
  };

  return {
    trigger,
    handleSubmitProject,
    control,
    validateSubmit,
  };
}
