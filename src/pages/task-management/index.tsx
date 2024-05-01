import MDEditor from "@/components/MDEditor";
import TaskBoard from "./components/TaskBoard";

import { useTheme } from "styled-components";
import { FlexBox } from "@/components/core";
import useHandleTask from "./hooks/useHandleTask";

export default function TaskManagement() {
  const theme = useTheme();

  const { setTasks, taskData, taskDataIndex } = useHandleTask();

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
