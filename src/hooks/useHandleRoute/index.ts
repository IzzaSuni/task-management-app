import { projectsAtom } from "@/components/Layout/components/Sidebar/hooks/useHandleProjectForm";
import { ROUTE } from "@/constant/routes";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";

export default function useHandleRoute() {
  const projects = useAtomValue(projectsAtom);
  const params = useParams<{ project_name: string }>();
  const navigate = useNavigate();

  const isProjectExist = !!projects?.find(
    (project) => project?.project_name == params?.project_name
  )?.id;

  const isOpeningProject = !!params?.project_name;

  useEffect(() => {
    if (isProjectExist) return;

    navigate(generatePath(ROUTE));
  }, [params?.project_name, isProjectExist]);

  return { isOpeningProject };
}
