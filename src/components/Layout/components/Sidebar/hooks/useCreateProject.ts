import { KEY_STORAGE } from "@/constant/storageKey";
import { useSetAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type Project = {
  id: number | string;
  project_name: string;
};

export const projectsAtom = atomWithStorage<Project[]>(
  KEY_STORAGE.PROJECTS_DATA,
  [],
  createJSONStorage(() => localStorage)
);

export default function useCreateProject() {
  const [isAddingPage, setIsAddingPage] = useState(false);
  const setProjects = useSetAtom(projectsAtom);

  const { control, trigger, handleSubmit, reset, watch } = useForm<Project>({
    defaultValues: { project_name: "" },
  });

  const onValid: SubmitHandler<Project> = (value) => {
    setProjects((projects) => [
      ...projects,
      { ...value, id: projects.length ? projects.length + 1 : 1 },
    ]);

    setIsAddingPage(false);
    reset();
  };

  return {
    isAddingPage,
    setIsAddingPage,
    trigger,
    handleSubmit,
    control,
    onValid,
  };
}
