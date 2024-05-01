import MDEditor from "@/components/MDEditor";
import TaskBoard, { taskAtom } from "./components/TaskBoard";

import { useTheme } from "styled-components";
import { FlexBox } from "@/components/core";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";

export default function TaskManagement() {
  const [tasks, setTasks] = useAtom(taskAtom);
  const theme = useTheme();

  const params = useParams<{ project_id: string }>();

  const taskData = tasks?.find(
    (task) => task?.project_id == params?.project_id
  );

  const taskDataIndex = tasks?.findIndex(
    (task) => task?.project_id == params?.project_id
  );

  return (
    <>
      <FlexBox my={theme.spacing.l}>
        <TaskBoard />
      </FlexBox>
      <MDEditor
        placeholder={"write additional detail here..."}
        markdown={taskData?.description ?? ""}
        onChange={(value) => {
          setTasks((tasks) => {
            tasks[taskDataIndex].description = value;

            return [...tasks];
          });
        }}
      />
    </>
  );
}
