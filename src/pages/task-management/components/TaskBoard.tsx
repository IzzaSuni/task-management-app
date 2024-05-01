import { Button, DatePicker, FlexBox, Text } from "@/components/core";
import { KEY_STORAGE } from "@/constant/storageKey";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useTheme } from "styled-components";
import {
  SelectContainer,
  TaskContainer,
  TaskTextField,
} from "./TaskBoard.styled";
import { UilFileNetwork } from "@iconscout/react-unicons";
import { useAtom } from "jotai";
import Select, { SingleValue } from "react-select";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export enum TaskStatuses {
  "completed" = "completed",
  "not-started" = "not-started",
  "in-progress" = "in-progress",
  "blocked" = "blocked",
}

type Tasks = {
  id: string;
  project_id: string;
  description?: string;
  data: {
    id: string;
    title: string;
    status: SingleValue<{
      value: TaskStatuses;
      label: string;
    }>;
    due_date: string;
  }[];
};

const taskStatuses = ["completed", "not-started", "in-progress", "blocked"].map(
  (e) => ({
    value: e as TaskStatuses,
    label: (e[0].toUpperCase() + e.slice(1, e.length)).replace("-", " "),
  })
);

export const taskAtom = atomWithStorage<Tasks[] | []>(
  KEY_STORAGE.TASKBOARD_DATA,
  [],
  createJSONStorage(() => localStorage)
);

const headerTaskData = ["Task", "Status", "Due date"];

export default function TaskBoard() {
  const theme = useTheme();
  const params = useParams<{ project_id: string }>();
  const [tasks, setTasks] = useAtom(taskAtom);

  const taskData = tasks?.find(
    (task) => task?.project_id == params?.project_id
  );

  const taskDataIndex = tasks?.findIndex(
    (task) => task?.project_id == params?.project_id
  );

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
            setTasks((tasks) => {
              tasks[taskDataIndex].data.push({
                due_date: "",
                id: uuidv4(),
                status: {
                  label: "Not started",
                  value: TaskStatuses["not-started"],
                },
                title: "",
              });

              return [...tasks];
            });
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
                  <FlexBox width={"50%"}>
                    <TaskTextField
                      width={"100%"}
                      value={title}
                      onChange={({ target: { value } }) => {
                        setTasks((tasks) => {
                          tasks[taskDataIndex].data[index] = {
                            ...tasks[taskDataIndex].data[index],
                            title: value,
                          };

                          return [...tasks];
                        });
                      }}
                      fontSize={theme.size.s}
                    />
                  </FlexBox>
                  <SelectContainer width={"20%"}>
                    <Select
                      value={status}
                      options={taskStatuses}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      onChange={(value) =>
                        setTasks((tasks) => {
                          tasks[taskDataIndex].data[index] = {
                            ...tasks[taskDataIndex].data[index],
                            status: value,
                          };

                          return [...tasks];
                        })
                      }
                    />
                  </SelectContainer>
                  <FlexBox width={"30%"}>
                    <DatePicker
                      value={due_date}
                      onChange={({ target: { value } }) => {
                        setTasks((tasks) => {
                          tasks[taskDataIndex].data[index] = {
                            ...tasks[taskDataIndex].data[index],
                            due_date: value,
                          };

                          return [...tasks];
                        });
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
