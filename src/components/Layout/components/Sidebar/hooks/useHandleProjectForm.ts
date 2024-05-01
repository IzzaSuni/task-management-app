import { ROUTE } from "@/constant/routes";
import { KEY_STORAGE } from "@/constant/storageKey";
import { useAtom, useSetAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import { generatePath, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  TaskStatuses,
  taskAtom,
} from "@/pages/task-management/components/TaskBoard";

export type Project = {
  id?: string;
  project_name: string;
  created_at?: string;
};

export const projectsAtom = atomWithStorage<Project[]>(
  KEY_STORAGE.PROJECTS_DATA,
  [],
  createJSONStorage(() => localStorage)
);

export default function useHandleProjectForm(props?: Project) {
  const [project, setProjects] = useAtom(projectsAtom);
  const setTasks = useSetAtom(taskAtom);
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
    const duplicateProject = project?.find(
      (project) => project?.project_name === value.project_name
    );

    return { isDuplicated: !!duplicateProject, duplicateProject };
  };

  const handleSubmitProject: SubmitHandler<Project> = (value) => {
    const { isDuplicated, duplicateProject } =
      handleDuplicatedProjectName(value);

    const project_id = uuidv4();

    if (isDuplicated && duplicateProject?.id) {
      reset();

      return navigate(
        generatePath(ROUTE, { project_id: duplicateProject?.id })
      );
    }

    if (props?.project_name) {
      return setProjects((projects) => {
        const projectIndex = projects.findIndex(
          (project) => project.id == props?.id
        );

        if (projectIndex >= 0) {
          projects[projectIndex] = {
            ...projects[projectIndex],
            id: props.id,
            project_name: value.project_name,
          };
        }

        return projects;
      });
    }

    setProjects((projects) => [
      ...projects,
      {
        ...value,
        id: project_id,
        created_at: dayjs().format("DD MMMM YYYY, hh:mm a"),
      },
    ]);

    setTasks((task) => {
      const newData = {
        id: uuidv4(),
        project_id: project_id,
        data: [
          {
            id: uuidv4(),
            title: "",
            due_date: "",
            status: {
              value: TaskStatuses["not-started"],
              label: "Not started",
            },
          },
        ],
      };

      if (!task?.length) {
        return [newData];
      }

      return [...task, newData];
    });

    navigate(generatePath(ROUTE, { project_id }));
    reset();
  };

  return {
    trigger,
    handleSubmitProject,
    control,
    validateSubmit,
  };
}
