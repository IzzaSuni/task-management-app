import { Button, DatePicker, FlexBox, Text } from "@/components/core";
import { useTheme } from "styled-components";
import {
  SelectContainer,
  TaskContainer,
  TaskTextField,
} from "./TaskBoard.styled";
import { UilFileNetwork } from "@iconscout/react-unicons";
import Select from "react-select";
import { useParams } from "react-router-dom";
import useHandleTask from "../hooks/useHandleTask";

export enum TaskStatuses {
  "completed" = "completed",
  "not-started" = "not-started",
  "in-progress" = "in-progress",
  "blocked" = "blocked",
}

const taskStatuses = ["completed", "not-started", "in-progress", "blocked"].map(
  (e) => ({
    value: e as TaskStatuses,
    label: (e[0].toUpperCase() + e.slice(1, e.length)).replace("-", " "),
  })
);

const headerTaskData = ["Task", "Status", "Due-date"];

export default function TaskBoard() {
  const theme = useTheme();
  const params = useParams<{ project_id: string }>();

  const { changeTaskData, taskData, handleAddNewTask } = useHandleTask();

  return (
    <FlexBox width={"100%"} padding={theme.spacing.m} flexDirection={"column"}>
      <FlexBox justifyContent={"space-between"}>
        <FlexBox alignItems={"center"} gap={theme.spacing.m}>
          <Text fontSize={theme.size.xl} fontWeight={600}>
            Task List
          </Text>
          <UilFileNetwork />
        </FlexBox>

        <Button
          background={theme.colors.backgroundFaded}
          padding={theme.spacing.m}
          borderRadius={theme.size.m}
          onClick={() => {
            handleAddNewTask();
          }}
        >
          <Text fontSize={theme.size.m}>Add Task</Text>
        </Button>
      </FlexBox>
      {!!taskData?.data?.length && (
        <TaskContainer flexDirection={"column"} padding={theme.spacing.m}>
          <FlexBox
            padding={theme.spacing.m}
            width={"100%"}
            borderBottom={`1px solid ${theme.colors.border}`}
          >
            {headerTaskData?.map((data) => (
              <FlexBox className={data}>
                <Text fontSize={theme.size.s}>{data}</Text>
              </FlexBox>
            ))}
          </FlexBox>
          <FlexBox padding={theme.spacing.m} flexDirection={"column"}>
            {taskData?.data?.map(({ due_date, status, title, id }, index) => (
              <FlexBox
                key={index}
                position={"relative"}
                width={"100%"}
                alignItems={"center"}
              >
                <Text
                  position={"absolute"}
                  left={-theme.spacing.xl}
                  fontSize={theme.size.s}
                >
                  {index + 1}
                </Text>
                <FlexBox width={"100%"}>
                  <FlexBox width={"-webkit-fill-available"}>
                    <TaskTextField
                      width={"100%"}
                      value={title}
                      onChange={({ target: { value } }) => {
                        changeTaskData("title", value, index);
                      }}
                      fontSize={theme.size.s}
                    />
                  </FlexBox>
                  <SelectContainer width={"30%"}>
                    <Select
                      value={status}
                      options={taskStatuses}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      onChange={(value) => {
                        changeTaskData("status", value, index);
                      }}
                    />
                  </SelectContainer>
                  <FlexBox width={"30%"}>
                    <DatePicker
                      value={due_date}
                      onChange={({ target: { value } }) => {
                        changeTaskData("due_date", value, index);
                      }}
                    />
                  </FlexBox>
                </FlexBox>
              </FlexBox>
            ))}
          </FlexBox>
        </TaskContainer>
      )}
    </FlexBox>
  );
}
