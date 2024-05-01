import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { SingleValue } from "react-select";
import { TaskStatuses } from "../components/TaskBoard";
import { KEY_STORAGE } from "@/constant/storageKey";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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

export const taskAtom = atomWithStorage<Tasks[] | []>(
  KEY_STORAGE.TASKBOARD_DATA,
  [],
  createJSONStorage(() => localStorage)
);

export default function useHandleTask() {
  const [tasks, setTasks] = useAtom(taskAtom);

  const params = useParams<{ project_id: string }>();

  const taskData = tasks?.find(
    (task) => task?.project_id == params?.project_id
  );

  const taskDataIndex = tasks?.findIndex(
    (task) => task?.project_id == params?.project_id
  );

  const changeTaskData = (key: string, value: any, index: number) => {
    setTasks((tasks) => {
      tasks[taskDataIndex].data[index] = {
        ...tasks[taskDataIndex].data[index],
        [key]: value,
      };

      return [...tasks];
    });
  };

  const handleAddNewTask = () => {
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
  };

  return {
    tasks,
    setTasks,
    taskData,
    taskDataIndex,
    changeTaskData,
    handleAddNewTask,
  };
}
